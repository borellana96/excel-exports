import * as mongoose from 'mongoose';
import { IConnectionConfig } from '../../../../../utils/utils';
import { UserAdress } from '../interfaces/user-address.interface';
import { DepartmentSchemaManager } from '../../../location/department/schemas/department.schema'
import { DistrictSchemaManager } from '../../../location/district/schemas/district.schema'
import { ProvinceSchemaManager } from '../../../location/province/schemas/province.schema'
import { LDVDetailSchemaManager } from '../../../../ldv/schemas/ldv-detail.schema'

export class UserAddressSchemaManager {
    /* config: IConnectionConfig;
    UserAddressModel: mongoose.Model<UserAdress>;
    dbConection: any
    constructor(config: IConnectionConfig, dbConection: any) {
        this.config = config;
        this.dbConection = dbConection
    } */

    static getModel(config, dbConection): mongoose.Model<UserAdress> {
        let UserAddressModel: mongoose.Model<UserAdress>;
        const exists = mongoose[dbConection].modelNames().find((value) => {
            return value === config.tenant + 'UserAddress';
        });

        if (!exists) {
            const DepartmentModel = DepartmentSchemaManager.getModel(config, dbConection);
            const ProvinceModel = ProvinceSchemaManager.getModel(config, dbConection);
            const DistrictModel = DistrictSchemaManager.getModel(config, dbConection);
            const LDVModel = LDVDetailSchemaManager.getModel(config, dbConection);
            const UserSchema = new mongoose.Schema({
                user_id: { type: String, required: true },
                name: { type: String, required: true },
                cellphone: { type: String },
                type_address_ERP: { type: String },
                type_address: { type: mongoose.Schema.Types.ObjectId, ref: LDVModel },
                ubigeo: { type: String, required: true },
                department: { type: mongoose.Schema.Types.ObjectId, ref: DepartmentModel },
                province: { type: mongoose.Schema.Types.ObjectId, ref: ProvinceModel },
                district: { type: mongoose.Schema.Types.ObjectId, ref: DistrictModel },
                address: { type: String, required: true },
                reference: { type: String },
                deleted: { type: Boolean, default: false },
                create_date: Date,
                update_date: Date,
                create_by: { type: String, required: true },
                update_by: { type: String },
            });
            UserAddressModel = mongoose[dbConection].model<UserAdress>(config.tenant + 'UserAddress', UserSchema, config.tenant + '__UserAddress');

        } else {
            UserAddressModel = mongoose[dbConection].model<UserAdress>(config.tenant + 'UserAddress');
        }
        return UserAddressModel;
    }
}
