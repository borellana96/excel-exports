import * as mongoose from 'mongoose';
import { IConnectionConfig } from '../../../../../utils/utils';
import { District } from '../interfaces/district.interface';


export class DistrictSchemaManager {
  /*   config: IConnectionConfig;
    dbConection:any
    DistrictModel: mongoose.Model<District>;
    constructor(config: IConnectionConfig, dbConection:any) {
      this.config = config;
      this.dbConection = dbConection
    }
   */
  static getModel(config, dbConection): mongoose.Model<District> {
    let DistrictModel: mongoose.Model<District>;
    const exists = mongoose[dbConection].modelNames().find((value) => {
      return value === config.tenant + 'District';
    });

    if (!exists) {
      const DistrictSchema = new mongoose.Schema({
        name: { type: String, required: true },
        id_province: { type: mongoose.Schema.Types.ObjectId },
        ubigeo: { type: String, required: true },
        create_date: { type: Date, default: Date.now },
        update_date: { type: Date },
        create_by: { type: String, required: true },
        update_by: { type: String }
      });
      DistrictModel = mongoose[dbConection].model<District>(config.tenant + 'District', DistrictSchema, config.tenant + '__District');
    } else {
      DistrictModel = mongoose[dbConection].model<District>(config.tenant + 'District');
    }
    return DistrictModel;
  }

}