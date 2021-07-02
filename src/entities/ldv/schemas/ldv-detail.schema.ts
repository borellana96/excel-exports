import * as mongoose from 'mongoose';
import { IConnectionConfig } from '../../../utils/utils';
import { LDVDetail } from '../interfaces/ldv-detail.interface';

/* export const LDVDetailSchema = new mongoose.Schema({
   code: { type: String, required: true },
   value: { type: String, required: true },
   description: String,
   active: { type: Boolean, required: true },
   ref1: String,
   ref2: String,
   ref3: String,
   ref4: String,
   ref5: String,
});
 */
export class LDVDetailSchemaManager {
  /*  config: IConnectionConfig;
    LDVDetailModel: mongoose.Model<LDVDetail>;
    dbConection: any;
    constructor(config: IConnectionConfig, dbConection: any) {
       this.config = config;
       this.dbConection = dbConection
    }
  */
  static getModel(config, dbConection): mongoose.Model<LDVDetail> {
    let LDVDetailModel: mongoose.Model<LDVDetail>;
    const exists = mongoose[dbConection].modelNames().find(value => {
      return value === config.tenant + 'LDVDetail';
    });
    if (!exists) {
      const LDVDetailSchema = new mongoose.Schema({
        code: { type: String, required: true },
        value: { type: String, required: true },
        description: String,
        active: { type: Boolean, required: true },
        ref1: String,
        ref2: String,
        ref3: String,
        ref4: String,
        ref5: String,
        ref_boolean1: Boolean,
        position: Number,
      });
      LDVDetailModel = mongoose[dbConection].model<LDVDetail>(
        config.tenant + 'LDVDetail',
        LDVDetailSchema,
        config.tenant + '__LDVDetail',
      );
    } else {
      LDVDetailModel = mongoose[dbConection].model<LDVDetail>(
        config.tenant + 'LDVDetail',
      );
    }
    return LDVDetailModel;
  }
}
