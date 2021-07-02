import * as mongoose from 'mongoose';
import { IConnectionConfig, Utils } from '../../../../../utils/utils';
import { Role } from '../interfaces/role.interface';

export class RoleSchemaManager {
  /*   config: IConnectionConfig;
    RoleModel: mongoose.Model<Role>;
    dbConection: any;
    constructor(config: IConnectionConfig, dbConection: any) {
      this.config = config;
      this.dbConection = dbConection;
    }
   */
  static getModel(config, dbConection): mongoose.Model<Role> {
    let RoleModel: mongoose.Model<Role>;
    const exists = mongoose[dbConection].modelNames().find(value => {
      return value === config.tenant + 'Role';
    });
    if (!exists) {
      const RoleSchema = new mongoose.Schema({
        name: String,
        description: String,
        functionalities: [
          {
            name: { type: String },
            module: { type: String },
            icon: { type: String },
            url: { type: String },
            visible: { type: Boolean },
            operations: [
              {
                url: { type: String },
                method: { type: String },
                description: { type: String },
                action: { type: String },
                code: { type: String },
              },
            ],
          },
        ],
        create_by: { type: mongoose.Schema.Types.ObjectId },
        update_by: { type: mongoose.Schema.Types.ObjectId },
        onlybd: { type: Boolean, default: false },
        create_ERP: { type: Boolean, default: false },
        create_date: { type: Date, default: Date.now },
        update_date: { type: Date },
      });
      RoleModel = mongoose[dbConection].model<Role>(
        config.tenant + 'Role',
        RoleSchema,
        config.tenant + '__Role',
      );
    } else {
      RoleModel = mongoose[dbConection].model<Role>(
        config.tenant + 'Role',
      );
    }
    return RoleModel;
  }
}
