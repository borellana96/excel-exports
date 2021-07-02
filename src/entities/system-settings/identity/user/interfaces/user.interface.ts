import { Document } from 'mongoose';
import { Role } from '../../role/interfaces/role.interface';

export interface User extends Document {
  readonly username: string;
  readonly password: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly birthDate: Date;
  readonly tenant: string;
  readonly cellphone: string;
  readonly first_time: boolean;
  readonly state: string;
  readonly verified_email: boolean;
  readonly deleted: boolean;
  readonly is_customer_admin: boolean;
  readonly genre: string;
  readonly create_date: Date;
  readonly role_id: any;
  readonly entity_type: string;
  readonly entity_id: string;
  type_document: any;
  readonly address: [string];
  readonly update_date: Date;
  additionals: any;
  readonly create_by: [User];
  readonly update_by: [User];
  giftCard: any
  wallet: any
  totalWallet:number
  code_ERP: string;
  wishlist?: any[];
}
