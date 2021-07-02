import * as mongoose from 'mongoose';
import { IConnectionConfig } from '../../../../../utils/utils';
import { Department } from '../interfaces/department.interface';
import { ProvinceSchemaManager } from '../../province/schemas/province.schema';

export class DepartmentSchemaManager {
    /*  config: IConnectionConfig;
     dbConection: any;
     DepartmentModel: mongoose.Model<Department>;
     constructor(config: IConnectionConfig, dbConection: any) {
         this.config = config;
         this.dbConection = dbConection;
     } */

    static getModel(config, dbConection): mongoose.Model<Department> {
        let DepartmentModel: mongoose.Model<Department>;
        const exists = mongoose[dbConection].modelNames().find((value) => {
            return value === config.tenant + 'Department';
        });

        if (!exists) {
            const provinceModel = ProvinceSchemaManager.getModel(config, dbConection);
            const DepartmentSchema = new mongoose.Schema({
                name: { type: String, required: true },
                province: [{ type: mongoose.Schema.Types.ObjectId, ref: provinceModel }],
                create_date: { type: Date, default: Date.now },
                update_date: { type: Date },
                create_by: { type: String, required: true },
                update_by: { type: String },
            });
            DepartmentModel = mongoose[dbConection].model<Department>(config.tenant + 'Department', DepartmentSchema, config.tenant + '__Department');
        } else {
            DepartmentModel = mongoose[dbConection].model<Department>(config.tenant + 'Department');
        }
        return DepartmentModel;
    }

}