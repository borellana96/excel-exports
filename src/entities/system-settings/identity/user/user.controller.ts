import {
  Controller,
  Get,
  Req,
  Query,
  Param
} from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import * as async from 'async';
import * as aws from 'aws-sdk';
import { Readable } from 'stream';

import { UserService } from './user.service';
import { Utils } from '../../../../utils/utils';
import { FormatExcel } from '../../../../utils/format-excel';
import { NotificationService } from '../../notification/service/notification.service';
import { INotificationRequired } from '../../notification/notification.interface';
import { BadGatewayException } from 'src/utils/generalExceptions';

@Controller('user')
export class UserController {

  constructor(
    private _userService: UserService,
    private _notificationService: NotificationService,
  ) { }

  @Get('template/:userId')
  async getCustomerTemplate(@Req() req, @Param('userId') userId, @Query('params') dates) {
    dates = JSON.parse(dates);
    let new_end_date_offer = new Date(dates.end_date_offer);
    new_end_date_offer.setHours(23, 59);
    let new_initial_date_offer = new Date(dates.initial_date_offer);
    new_initial_date_offer.setHours(0, 0);

    const query = {
      create_date: { $gte: new_initial_date_offer, $lte: new_end_date_offer },
      is_customer_admin: 0,
      deleted: false
    };

    const customers = await this._userService.findAllForExport(req.config, query)
    const bufferExcel = await this.createUserExcel(customers, dates);

    // Fecha y Hora actual
    let date = new Date();
    let difference = date.getTime() - 5 * 1000 * 60 * 60; //Disminución de 5 horas (zona horaria)
    date.setTime(difference);
    let dateCurrent = date.toISOString()
      .substring(0, 19)
      .replace("T", "_")
      .replace(/[-]/g, "")
      .replace(/[:]/g, "");

    const fileName = req.config.tenant + "_ExportacionClientes_" + dateCurrent + "_" + userId + ".xlsx";
    const stream = new Readable();
    stream.push(bufferExcel);
    stream.push(null);

    // Subirlo al Servidor AWS
    let bucketExcel = process.env.STORAGE_ATTACHMENT_BUCKET_NAME || 'luxurysass/storage-attachment';
    bucketExcel += '/excels';

    const s3 = new aws.S3({
      endpoint: process.env.STORAGE_ATTACHMENT_ENDPOINT || 'sfo2.digitaloceanspaces.com',
      accessKeyId: process.env.STORAGE_ATTACHMENT_KEY_ID || 'WNNKAGZ52FG6AIGRKPRB',
      secretAccessKey: process.env.STORAGE_ATTACHMENT_ACCESS_KEY || 'T17+hRBHpZY7iTt7jVFxgyRoX07V1P78ilm6/YYLLko',
    });

    var params = {
      ACL: 'public-read',
      ContentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      Bucket: bucketExcel,
      Key: fileName,
      Body: stream
    };

    s3.upload(params, (err, data) => {
      if (err)
        console.log('Error uploading excel to AWS: ', err);
      else {
        let objNotification: INotificationRequired = {
          userId: userId,
          title: 'Exportación de Excel de Clientes',
          message: 'Su descarga de exportación de clientes ha finalizado. Seleccione aquí para descargar.',
          typeNotification: 'PROCESS',
          redirectionUrl: data.Location,
          redirectionExternal: true,
        }
        this._notificationService.create(req.config, objNotification).then(res => {
          console.log('Excel Notification created succesfully');
        }).catch(err => {
          throw new BadGatewayException('An error creating the excel notification');
        });
      }
    });
  }

  async createUserExcel(customers, dates) {
    var workbook = new ExcelJS.Workbook();

    var worksheet1 = workbook.addWorksheet('Exportación de clientes', {
      views: [
        { state: 'frozen', ySplit: 3, activeCell: 'B4', showGridLines: false },
      ],
    });

    worksheet1.spliceRows(0, 1);

    const letterStart = 'B';
    const letterEnd = 'K';
    const titlesRow0 = [];
    const titlesRow1 = [];

    //worksheet 1

    const titlesRow2 = [
      '',
      'Nro de Tar. Luxury',
      'DNI/CE',
      'Sufijo',
      'Nombres',
      'Apellidos',
      'Apellidos2',
      'Telefono',
      'Email',
      'Nacimiento',
      'Created'
    ];

    worksheet1.spliceRows(1, 0, titlesRow0, titlesRow1, titlesRow2);
    worksheet1.columns = [
      { key: '', width: 10 },
      { key: 'Nro de Tar. Luxury', width: 25, style: { numFmt: '@' } }, //B
      { key: 'DNI/CE', width: 10, style: { numFmt: '@' } }, //C
      { key: 'Sufijo', width: 10 }, //D
      { key: 'Nombres', width: 14 }, //E
      { key: 'Apellidos', width: 20 }, //F
      { key: 'Apellidos2', width: 20 }, //G
      { key: 'Telefono', width: 20 }, // H
      { key: 'Email', width: 35 }, //I
      { key: 'Nacimiento', width: 20 }, //J
      { key: 'Created', width: 17 },//K
    ];
    worksheet1.mergeCells('B2:K2');

    let initial_date = dates.initial_date_offer.substring(0, 10);
    let end_date = dates.end_date_offer.substring(0, 10);
    worksheet1.getCell('J2').value = `Exportación de Clientes (Desde: ${initial_date} Hasta: ${end_date})`;

    FormatExcel.formatHeader(worksheet1, 2, letterStart, letterEnd);
    FormatExcel.formatHeader(worksheet1, 3, letterStart, letterEnd);

    let properties = {
      B: "number_card",
      C: "number_document",
      D: "suffix",
      E: "name",
      F: "last_name_father",
      G: "last_name_mother",
      H: "phone",
      I: "email",
      J: "birth_date",
      K: "create_date"
    }

    console.time('Tiempo del Excel: ');
    await new Promise((resolve, reject) => {
      async.eachOfLimit(customers, 2, (val, i, callback) => {
        worksheet1.getCell(`B${i + 4}`).value = val["additionals"][properties['B']];
        worksheet1.getCell(`C${i + 4}`).value = val["additionals"][properties['C']];
        worksheet1.getCell(`D${i + 4}`).value = val["additionals"][properties['D']];
        worksheet1.getCell(`E${i + 4}`).value = val["additionals"][properties['E']];
        worksheet1.getCell(`F${i + 4}`).value = val["additionals"][properties['F']];
        worksheet1.getCell(`G${i + 4}`).value = val["additionals"][properties['G']];
        worksheet1.getCell(`H${i + 4}`).value = val["additionals"][properties['H']];
        worksheet1.getCell(`I${i + 4}`).value = val["email"];
        worksheet1.getCell(`J${i + 4}`).value =
          Utils.setDateLocation(val["additionals"][properties['J']], 'YYYY-MM-DD HH:mm:ss');
        worksheet1.getCell(`K${i + 4}`).value =
          Utils.setDateLocation(val[properties['K']], 'YYYY-MM-DD HH:mm:ss');
        FormatExcel.borderCellRow(
          worksheet1,
          i + 4,
          letterStart,
          letterEnd,
          'FFE0E0E0',
        );
        FormatExcel.alignmentCell(
          worksheet1,
          'K' + i + 4,
          'middle',
          'center',
        );
        if ((i + 4) % 2) {
          FormatExcel.backgroundRow(
            worksheet1,
            i + 4,
            letterStart,
            letterEnd,
            'FFF9F9F9',
          );
        }
        callback();
      }, (err) => {
        if (err) {
          console.log(err)
          console.log('A excel failed to process');
          reject({})
        } else {
          console.log('All excel have been processed successfully');
          resolve({})
        }
      });
    });
    console.timeEnd('Tiempo del Excel: ');

    const bufferExcel: any = await new Promise(function (resolve, reject) {
      workbook.xlsx.writeBuffer().then(function (buffer) {
        resolve(buffer);
      });
    });

    return bufferExcel;
  }
}