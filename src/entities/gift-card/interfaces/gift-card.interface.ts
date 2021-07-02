import { Document } from 'mongoose';

export interface GiftCard extends Document {
    readonly number: string;
    readonly active: boolean;
    readonly used: boolean;
    readonly amount: number;
    readonly create_by: string;
    update_by: string;
    readonly create_date: Date;
    update_date: Date;
}
