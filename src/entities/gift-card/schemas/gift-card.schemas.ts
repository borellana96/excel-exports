import * as mongoose from 'mongoose';
import { GiftCard } from '../interfaces/gift-card.interface';

export class GiftCardSchemaManager {
    static getModel(config, dbConection): mongoose.Model<GiftCard> {
        let GiftCardModel: mongoose.Model<GiftCard>;
        const exists = mongoose[dbConection].modelNames().find((value) => {
            return value === config.tenant + 'GiftCard';
        });
        if (!exists) {
            const GiftCardSchema = new mongoose.Schema({
                number: { type: String, required: true },
                active: { type: Boolean, required: true },
                used: { type: Boolean, required: true },
                amount: { type: Number, required: true },
                create_by: { type: String, required: true },
                update_by: { type: String, required: true },
                create_date: Date,
                update_date: Date
            });
            GiftCardModel = mongoose[dbConection].model<GiftCard>(config.tenant + 'GiftCard', GiftCardSchema, config.tenant + '__GiftCard');
        } else {
            GiftCardModel = mongoose[dbConection].model<GiftCard>(config.tenant + 'GiftCard');
        }
        return GiftCardModel;
    }
}