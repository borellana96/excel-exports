import { Injectable, Scope } from '@nestjs/common';
import { Operation } from './interfaces/operation.interface';
import { OperationDto } from './dto/functionality.dto';
import * as mongoose from 'mongoose';
import { IConnectionConfig } from '../../../../utils/utils';
import { OperationSchema } from './schemas/operation.schema';
import { Connect } from '../../../../connect/connect';

@Injectable({ scope: Scope.DEFAULT })
export class OperationService {
  constructor() {}

  async create(
    config: IConnectionConfig,
    createDto: OperationDto,
  ): Promise<Operation> {
    const dbConection = await Connect.bdConnect(config.dbconn);
    const OperationModel = mongoose[dbConection].model<Operation>(
      'User',
      OperationSchema,
      config.tenant + '__Operation',
    );
    const created = new OperationModel(createDto);
    const result = await created.save();

    return result;
  }

  async update(
    config: IConnectionConfig,
    _id: string,
    updateDto: OperationDto,
  ): Promise<Operation> {
    const dbConection = await Connect.bdConnect(config.dbconn);
    const OperationModel = mongoose[dbConection].model<Operation>(
      'User',
      OperationSchema,
      config.tenant + '__Operation',
    );
    let result: Promise<Operation> | null;
    OperationModel.findById(_id)
      .exec()
      .then(async findItem => {
        findItem = Object.assign(findItem, updateDto);
        result = findItem.save();
      });

    return await result;
  }

  async findAll(config: IConnectionConfig): Promise<Operation[]> {
    const dbConection = await Connect.bdConnect(config.dbconn);
    const OperationModel = mongoose[dbConection].model<Operation>(
      'User',
      OperationSchema,
      config.tenant + '__Operation',
    );
    const result = await OperationModel.find().exec();

    return result;
  }

  async findOne(config: IConnectionConfig, _id: string): Promise<Operation> {
    const dbConection = await Connect.bdConnect(config.dbconn);
    const OperationModel = mongoose[dbConection].model<Operation>(
      'User',
      OperationSchema,
      config.tenant + '__Operation',
    );
    const result = await OperationModel.findById(_id).exec();

    return result;
  }
}
