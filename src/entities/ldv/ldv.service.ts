
import { Injectable, Scope } from '@nestjs/common';
import { LDV } from './interfaces/ldv.interface';
import { LDVDto } from './dto/ldv.dto';
import { LDVSchemaManager } from './schemas/ldv.schema';
import * as mongoose from 'mongoose';
import { IConnectionConfig } from '../../utils/utils';
import { Connect } from '../../connect/connect';

@Injectable({ scope: Scope.DEFAULT })
export class LDVService {
  constructor() { }

  async create(config: IConnectionConfig, createDto: LDVDto): Promise<LDV> {
    const dbConection = await Connect.bdConnect(config.dbconn);
    const LDVModel = LDVSchemaManager.getModel(config, dbConection);
    const created = new LDVModel(createDto);
    const result = await created.save();

    return result;
  }

  async update(config: IConnectionConfig, _id: string, updateDto: LDVDto): Promise<LDV> {
    const dbConection = await Connect.bdConnect(config.dbconn);
    const LDVModel = LDVSchemaManager.getModel(config, dbConection);
    let result: Promise<LDV> | null;
    LDVModel.findById(_id).exec().then(async (findItem) => {
      findItem = Object.assign(findItem, updateDto);
      result = findItem.save();
    });

    return await result;
  }

  async findAll(config: IConnectionConfig): Promise<LDV[]> {
    const dbConection = await Connect.bdConnect(config.dbconn);
    const LDVModel = LDVSchemaManager.getModel(config, dbConection);
    const result = await LDVModel.find({ visible_select: true }).sort({ name: 1 }).exec();

    return result;
  }

  async findOne(config: IConnectionConfig, _id: string): Promise<LDV> {
    const dbConection = await Connect.bdConnect(config.dbconn);
    const LDVModel = LDVSchemaManager.getModel(config, dbConection);
    const result = await LDVModel.findById(_id).exec();

    return result;
  }

  async findOneCondition(config: IConnectionConfig, condition: any): Promise<LDV> {
    const dbConection = await Connect.bdConnect(config.dbconn);
    const LDVModel = LDVSchemaManager.getModel(config, dbConection);
    const result = await LDVModel.findOne(condition).exec();

    return result;
  }


}
