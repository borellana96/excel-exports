import * as mongoose from 'mongoose';

import { Enterprise } from '../interfaces/enterprise.interface';

import { CurrencySchemaManager } from '../../../entities/currency/schemas/currency.schemas';

export class EnterpriseSchemaManager {
    /*    config: IConnectionConfig;
       EnterpriseModel: mongoose.Model<Enterprise>;
       dbConection: any;
       constructor(config: IConnectionConfig, dbConection: any) {
           this.config = config;
           this.dbConection = dbConection;
       } */

    static getModel(config, dbConnection): mongoose.Model<Enterprise> {
        let EnterpriseModel: mongoose.Model<Enterprise>;
        const exists = mongoose[dbConnection].modelNames().find((value) => {
            return value === 'Enterprise';
        });
        if (!exists) {
            const CurrencyModel = CurrencySchemaManager.getModel(config, dbConnection);
            const UserSchema = new mongoose.Schema({
                database_connection: { type: 'string', },
                url_main_page: { type: 'string', },
                bussiness_name: { type: 'string', },
                tenant: { type: 'string', },
                active: { type: 'boolean', },
                allowed_hosts: { type: 'mixed', },
                name: { type: 'string', },
                contact_phone: { type: 'string', },
                contact_address: { type: 'string', },
                contact_email: { type: 'string', },
                position_lat: { type: Number, },
                position_lng: { type: Number, },
                marker_position: { type: 'string', },
                bussiness_img: { type: 'string', },
                contact_phone_img: { type: 'string', },
                contact_address_img: { type: 'string', },
                contact_email_img: { type: 'string', },
                allowed_api_request_hosts: { type: 'mixed', },
                query_json: { type: 'mixed', },
                external_api_request: { type: 'mixed', },
                currency: [{ type: mongoose.Schema.Types.ObjectId, ref: CurrencyModel }],
                token: { type: 'string', },
                key: { type: 'string', },
                bussiness_parameters: { type: 'mixed', },
            });
            EnterpriseModel = mongoose[dbConnection].model<Enterprise>('Enterprise', UserSchema, 'enterprise');
        } else {
            EnterpriseModel = mongoose[dbConnection].model<Enterprise>('Enterprise');
        }
        return EnterpriseModel;
    }
}

