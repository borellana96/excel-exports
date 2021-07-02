import { Document } from 'mongoose';
export interface Currency extends Document {
    currency: string;
    simbol: string;
    code: string;
}