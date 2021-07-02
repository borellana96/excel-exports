import { Injectable } from '@nestjs/common';
import { Enterprise } from './interfaces/enterprise.interface';
import { EnterpriseSchemaManager } from './schemas/enterprise.schema';
import { IConnectionConfig } from '../../utils/utils';
import { Connect } from '../../connect/connect';

@Injectable()
export class EnterpriseService {
  constructor() { }

  async findAll(config: IConnectionConfig, objSearch?: any): Promise<Enterprise[]> {
    const objConection = await Connect.bdConnect(config.dbconn);
    const AuthorizationModel = EnterpriseSchemaManager.getModel(config, objConection);
    const result = await AuthorizationModel.find(objSearch)
      .exec();
    return result;
  }

  async findDataBaseList(config: IConnectionConfig): Promise<Enterprise[]> {
    const dbConection = await Connect.bdConnect(config.dbconn);
    const AuthorizationModel = EnterpriseSchemaManager.getModel(config, dbConection);
    const result: Enterprise[] = await AuthorizationModel.find(
      { active: true },
      { database_connection: true, tenant: true },
    )
      .lean()
      .exec();
    return result;
  }
}
