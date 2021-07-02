import * as mongoose from 'mongoose';
import { Currency } from '../interfaces/currency.interfaces';

export class CurrencySchemaManager {
    /*     config: IConnectionConfig;
        CurrencyModel: mongoose.Model<Currency>;
        dbConection: any;
        constructor(config: IConnectionConfig, dbConection: any) {
            this.config = config;
            this.dbConection = dbConection;
        } */

    static getModel(config, dbConection): mongoose.Model<Currency> {
        let CurrencyModel: mongoose.Model<Currency>;
        const exists = mongoose[dbConection].modelNames().find((value) => {
            return value === 'Currency';
        });

        if (!exists) {
            const UserSchema = new mongoose.Schema({
                currency: { type: 'string', },
                simbol: { type: 'string', },
                code: { type: 'string', }
            });
            CurrencyModel = mongoose[dbConection].model<Currency>('Currency', UserSchema, 'currency');

        } else {
            CurrencyModel = mongoose[dbConection].model<Currency>('Currency');
        }
        return CurrencyModel;
    }
}

