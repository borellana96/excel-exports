import * as mongoose from 'mongoose';
import { LDVDetailSchemaManager } from './ldv-detail.schema';
import { IConnectionConfig } from '../../../utils/utils';
import { LDV } from '../interfaces/ldv.interface';

export class LDVSchemaManager {
  /*   config: IConnectionConfig;
    LDVModel: mongoose.Model<LDV>;
    dbConection:any;
    constructor(config: IConnectionConfig,dbConection:any) {
      this.config = config;
      this.dbConection=dbConection;
    }
   */
  static getModel(config, dbConection): mongoose.Model<LDV> {
    let LDVModel: mongoose.Model<LDV>;
    const exists = mongoose[dbConection].modelNames().find((value) => {
      return value === config.tenant + 'LDV';
    });
    if (!exists) {
      const LDVDetailModel = LDVDetailSchemaManager.getModel(config, dbConection);
      const LDVSchema = new mongoose.Schema({
        code: { type: String, required: true },
        name: { type: String, required: true },
        tenant: { type: String, required: true },
        description: String,
        details: [{ type: mongoose.Schema.Types.ObjectId, ref: LDVDetailModel }],
      });
      LDVModel = mongoose[dbConection].model<LDV>(config.tenant + 'LDV', LDVSchema, config.tenant + '__LDV');
    } else {
      LDVModel = mongoose[dbConection].model<LDV>(config.tenant + 'LDV');
    }
    return LDVModel;
  }
}