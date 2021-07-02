import { Injectable, Scope } from "@nestjs/common";
import { IConnectionConfig } from '../../utils/utils';
import { LDVDetail } from './interfaces/ldv-detail.interface';
import { Connect } from '../../connect/connect';
import { LDVDetailSchemaManager } from "./schemas/ldv-detail.schema";

@Injectable({ scope: Scope.DEFAULT })
export class LDVDetailService {

  async findOne(config: IConnectionConfig, _id: string): Promise<LDVDetail> {
    const dbConection = await Connect.bdConnect(config.dbconn);
    const LDVDetailModel = await LDVDetailSchemaManager.getModel(
      config,
      dbConection,
    );
    const result = await LDVDetailModel.findById(_id).exec();
    return result;
  }
  
  async findOneCondition(config: IConnectionConfig, condition: any): Promise<LDVDetail> {
    const dbConection = await Connect.bdConnect(config.dbconn);
    const LDVDetailModel = LDVDetailSchemaManager.getModel(config, dbConection);
    const result = await LDVDetailModel.findOne(condition).exec();
    return result;
  }
}