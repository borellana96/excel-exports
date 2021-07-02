import * as mongoose from 'mongoose';

export const OperationSchema = new mongoose.Schema({
  url: String,
  method: String,

});
