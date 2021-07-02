import { Document } from 'mongoose';
import { Operation } from '../../../../../entities/system-settings/identity/operation/interfaces/operation.interface';

export interface Functionality extends Document {
  readonly name: string;
  readonly module: string;
  readonly icon: string;
  readonly url: string;
  readonly visible: boolean;
  readonly active: boolean;
  readonly operations: [Operation];
  readonly order: number
}
