import { Document } from 'mongoose';

export interface District extends Document {
  readonly name: string;
  readonly id_province:string;
  readonly ubigeo:string;
  readonly create_by: string;
  readonly update_by: string;
  readonly create_date: Date;
  readonly update_date: Date;
}