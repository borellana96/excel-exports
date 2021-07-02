import { Injectable, Scope } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { IConnectionConfig } from '../../../../utils/utils';
import { UserSchemaManager } from './schemas/user.schema';
import { Connect } from '../../../../connect/connect';

@Injectable({ scope: Scope.DEFAULT })
export class UserService {
  constructor() { }

  async findAllForExport(config: IConnectionConfig, objSearch?: any): Promise<User[]> {
    const dbConection = await Connect.bdConnect(config.dbconn);
    const UserModel = UserSchemaManager.getModel(config, dbConection);
    const result = await UserModel.find(objSearch)
      .select('additionals email create_date')
      .lean()
      .sort({ create_date: 1 })
      .exec();

    return result;
  }

  async findBasicInfo(config: IConnectionConfig, _id: string): Promise<User> {
    const dbConection = await Connect.bdConnect(config.dbconn);
    const UserModel = UserSchemaManager.getModel(config, dbConection);
    const result = await UserModel.findById(
      _id,
      '-password -deleted -verified_email -state -is_customer_admin -create_by -tenant',
    )
      .populate('role_id')
      .lean()
      .exec();
    return result;
  }

}
