import { Document } from 'mongoose';

export interface Operation extends Document {
  readonly url: string;
  readonly method: string;
}