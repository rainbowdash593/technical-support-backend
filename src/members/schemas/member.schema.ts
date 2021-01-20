import * as mongoose from 'mongoose';

export const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tag: { type: String, required: true },
  messengers: [
    {
      name: { type: String, required: true },
      username: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});
