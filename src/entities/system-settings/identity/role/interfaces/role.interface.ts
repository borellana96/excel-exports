import { Document } from 'mongoose';
import { Functionality } from '../../functionality/interfaces/functionality.interface';

export interface Role extends Document {
  readonly name: string;
  readonly description: string;
  functionalities: any;
  create_ERP: boolean;
  readonly create_by: string;
  readonly update_by: string;
  readonly create_date: Date;
  readonly update_date: Date;
}