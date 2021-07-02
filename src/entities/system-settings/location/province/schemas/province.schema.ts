import * as mongoose from 'mongoose';
import { IConnectionConfig } from '../../../../../utils/utils';
import { Province } from '../interfaces/province.interface';
import { DistrictSchemaManager } from '../../district/schemas/district.schema';


export class ProvinceSchemaManager {
    /*     config: IConnectionConfig;
        dbConection: any
        ProvinceModel: mongoose.Model<Province>;
        constructor(config: IConnectionConfig, dbConection: any) {
            this.config = config;
            this.dbConection = dbConection
        }
     */
    static getModel(config, dbConection): mongoose.Model<Province> {
        let ProvinceModel: mongoose.Model<Province>;
        const exists = mongoose[dbConection].modelNames().find((value) => {
            return value === config.tenant + 'Province';
        });

        if (!exists) {
            const districtModel = DistrictSchemaManager.getModel(config, dbConection);
            const ProvinceSchema = new mongoose.Schema({
                name: { type: String, required: true },
                id_department: { type: mongoose.Schema.Types.ObjectId },
                district: [{ type: mongoose.Schema.Types.ObjectId, ref: districtModel }],
                create_date: { type: Date, default: Date.now },
                update_date: { type: Date },
                create_by: { type: String, required: true },
                update_by: { type: String }
            });
            ProvinceModel = mongoose[dbConection].model<Province>(config.tenant + 'Province', ProvinceSchema, config.tenant + '__Province');

        } else {
            ProvinceModel = mongoose[dbConection].model<Province>(config.tenant + 'Province');
        }
        return ProvinceModel;
    }

}