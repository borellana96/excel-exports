
import * as uuid from 'uuid';
import * as JWT from 'jsonwebtoken';
import { Constants } from './constant';
import { InternalServerErrorException } from './generalExceptions';
const moment = require('moment-timezone');
export class Utils {
  static environment: 'STAGING' | 'PROD' | string =
    process.env.ENVIRONMENT || 'STAGING';

  static log(...args): void {
    if (this.environment.trim() !== 'PROD') {
      // tslint:disable-next-line:no-console
    }
  }

  /*static trace(line, error, tenant, userId, objConection?): void {
    const saveError: any = {};
    saveError.line_info = line;
    saveError.error_description = error;
    saveError.tenant = tenant;
    saveError.create_by = userId;

    const serviceError = new ControlErrorService();
    const contorlErrorController = new ControlErrorController(serviceError);
    contorlErrorController.create(saveError).then(
      () => {
        return 'save error';
      },
      err => {
        return err;
      },
    );
  }*/

  static limitDate(date: Date): any {
    let dateChange = new Date(date);
    const day = dateChange.getDate();
    const month = dateChange.getMonth();
    const year = dateChange.getFullYear();
    const dateReturn = new Date(year, month, day);
    return dateReturn;
  }
  static nextDay(date: Date): any {
    let dateChange = new Date(date);
    let nextDay = new Date(dateChange.setDate(dateChange.getDate() + 1));
    nextDay = this.limitDate(nextDay);
    return nextDay;
  }

  static dayBefore(date: Date): any {
    let dateChange = new Date(date);
    let dayBefore = new Date(dateChange.setDate(dateChange.getDate() - 1));
    dayBefore = this.limitDate(dayBefore);
    return dayBefore;
  }

  /*  static roundNumber(num: any,scale:any): any {
     if (!("" + num).includes("e")) {
         return +(Math.round(num + Number.EPSILON + scale) + "e-" + scale);
     } else {
         var arr = ("" + num).split("e");
         var sig = ""
         if (+arr[1] + scale > 0) {
             sig = "+";
         }
         return +(Math.round(+arr[0] + Number.EPSILON + sig + (+arr[1] + scale)) + "e-" + scale);
     }
   } */


  static setDateLocation(date, format) {
    //https://momentjs.com/timezone/
    //https://momentjs.com/
    // moment.locale();  en
    //LT    =>  4:07 PM
    //LTS   =>  4:07:41 PM
    //L     =>  08/30/2020
    //l     =>  8/30/2020
    //LL    =>  August 30, 2020
    //ll    =>  Aug 30, 2020
    //LLL   =>  August 30, 2020 4:07 PM
    //lll   =>  Aug 30, 2020 4:07 PM
    //LLLL  =>  Sunday, August 30, 2020 4:07 PM
    //llll  =>  Sun, Aug 30, 2020 4:07 PM

    return moment.tz(date, "America/Lima").format(format)
  }

  static cleanString(cadena: string): string {
    const specialChars = '!@#$^&%*()+=-[]/{}|:<>?,.';
    for (const char of specialChars) {
      cadena = cadena.replace(new RegExp('\\' + char, 'gi'), '');
    }
    cadena = cadena.toLowerCase();
    cadena = cadena.replace(/ /g, '_');
    cadena = cadena.replace(/á/gi, 'a');
    cadena = cadena.replace(/é/gi, 'e');
    cadena = cadena.replace(/í/gi, 'i');
    cadena = cadena.replace(/ó/gi, 'o');
    cadena = cadena.replace(/ú/gi, 'u');
    cadena = cadena.replace(/ñ/gi, 'n');
    cadena = cadena.replace(/\./gi, '_');
    cadena = cadena.replace(/\(/gi, '_');
    cadena = cadena.replace(/\)/gi, '');
    cadena = cadena.replace(/\//gi, '');
    cadena = cadena.replace(/\%/gi, '');
    return cadena;
  }

  static getListColors() {
    return [
      { name: 'SALMON', value: '#FA8072' },
      { name: 'CARMESI', value: '#DC143C' },
      { name: 'ROJO', value: '#FF0000' },
      { name: 'GUINDA', value: '#8B0000' },
      { name: 'ROSADO', value: '#FFC0CB' },
      { name: 'FUCSIA', value: '#FF00FF' },
      { name: 'NARANJA', value: '#FF4500' },
      { name: 'AMARILLO', value: '#FFD700' },
      { name: 'CREMA', value: '#FAFAD2' },
      { name: 'VIOLETA', value: '#EE82EE' },
      { name: 'PURPURA', value: '#800080' },
      { name: 'INDIGO', value: '#4B0082' },
      { name: 'VERDE', value: '#32CD32' },
      { name: 'CYAN', value: '#00FFFF' },
      { name: 'AGUAMARINA', value: '#66CDAA' },
      { name: 'TURQUESA', value: '#40E0D0' },
      { name: 'CELESTE', value: '#00BFFF' },
      { name: 'AZUL', value: '#0000FF' },
      { name: 'AZUL OSCURO', value: '#000080' },
      { name: 'MARRON', value: '#A52A2A' },
      { name: 'BLANCO', value: '#FFFFFF' },
      { name: 'NEGRO', value: '#000000' },
      { name: 'PLATA', value: '#C0C0C0' },
      { name: 'GRIS', value: '#808080' }
    ]
  }

  static fingerPrint(): any {
    return uuid.v1();
  }

  static escapeRegExp(string): string {
    let value = string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
                                  .replace(/[aáàä]/gi, "[a,á,à,ä]")
                                  .replace(/[eéèë]/gi, "[e,é,è,ë]")
                                  .replace(/[iíìï]/gi, "[i,í,ì,ï]")
                                  .replace(/[oóòö]/gi, "[o,ó,ò,ö]")
                                  .replace(/[uúùü]/gi, "[u,ú,ù,ü]")
                                  .replace(/[nñ]/gi, "[n,ñ]");
    return value;
  }

  static async deserialize(jwt) {
    const publicKey = Constants.jwtKeys('loginKey');

    return await new Promise((resolve, reject) => {
      JWT.verify(jwt, publicKey, (err, decoded: any) => {
        if (err) {
          Utils.log(err);
          reject(InternalServerErrorException);
          throw new InternalServerErrorException();
        } else {
          resolve(decoded);
        }
      });
    });
  }


}

export interface IConnectionConfig {
  tenant: string;
  dbconn: string;
}



