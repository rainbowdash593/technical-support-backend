import * as mongoose from 'mongoose';

export const TeamSchema = new mongoose.Schema({
  name: String,
  telegramChat: String,
  createdAt: Date,
  updatedAt: Date,
});
