import * as mongoose from 'mongoose';
import { IConnectionConfig } from '../../../../../utils/utils';
import { Functionality } from '../interfaces/functionality.interface';

export class FunctionalitySchema {
  /*  config: IConnectionConfig;
   FunctionalityModel: mongoose.Model<Functionality>;
   dbConection: any;
   constructor(config: IConnectionConfig, dbConection: any) {
     this.config = config;
     this.dbConection = dbConection;
   }
  */
  static getModel(config, dbConection): mongoose.Model<Functionality> {
    let FunctionalityModel: mongoose.Model<Functionality>;
    const exists = mongoose[dbConection].modelNames().find(value => {
      return value === config.tenant + 'Functionality';
    });

    if (!exists) {
      const FunctionalitySchema = new mongoose.Schema({
        name: String,
        module: String,
        icon: String,
        url: String,
        visible: Boolean,
        active: Boolean,
        order: Number,
        operations: [
          {
            url: { type: String },
            method: { type: String },
            description: { type: String },
            action: { type: String },
          },
        ],
      });
      FunctionalityModel = mongoose[dbConection].model<Functionality>(
        config.tenant + 'Functionality',
        FunctionalitySchema,
        config.tenant + '__Functionality',
      );
    } else {
      FunctionalityModel = mongoose[dbConection].model<Functionality>(
        config.tenant + 'Functionality',
      );
    }
    return FunctionalityModel;
  }
}
