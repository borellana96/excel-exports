import { Document } from 'mongoose';

export interface Department extends Document {
  readonly name: string;
  readonly province: [string];
  readonly create_by: string;
  readonly update_by: string;
  readonly create_date: Date;
  readonly update_date: Date;
}