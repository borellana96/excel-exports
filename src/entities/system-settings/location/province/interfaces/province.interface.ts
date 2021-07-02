import { Document } from 'mongoose';

export interface Province extends Document {
  readonly name: string;
  readonly id_department:string;
  readonly create_by: string;
  readonly district: [string];
  readonly update_by: string;
  readonly create_date: Date;
  readonly update_date: Date;
}