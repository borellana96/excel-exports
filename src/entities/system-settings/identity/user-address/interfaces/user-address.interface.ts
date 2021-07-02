import { Document } from 'mongoose';

export interface UserAdress extends Document {
  readonly user_id: string;
  readonly name: string;
  readonly cellphone: string;
  readonly type_address: string;
  readonly ubigeo: string;
  readonly department: string;
  readonly province: string;
  readonly type_address_ERP;
  readonly district: string;
  readonly address: string;
  readonly deleted: boolean;
  readonly reference: string;
  readonly create_date: Date;
  readonly update_date: Date;
  readonly create_by: string;
  readonly update_by: string;
}
