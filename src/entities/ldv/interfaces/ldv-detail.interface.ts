import { Document } from 'mongoose';

export interface LDVDetail extends Document {
  readonly code: string;
  readonly value: string;
  readonly description: string;
  readonly active: boolean;
  readonly ref1: string;
  readonly ref2: string;
  readonly ref3: string;
  readonly ref4: string;
  readonly ref5: string;
  readonly position: number;
  readonly ref_boolean1: boolean;
}
