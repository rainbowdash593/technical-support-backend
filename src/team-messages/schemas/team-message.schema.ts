import * as mongoose from 'mongoose';

export const TeamMessageSchema = new mongoose.Schema({
  provider: { type: String, required: true },
  team: { type: mongoose.Types.ObjectId, required: true, ref: 'Team' },
  user: { type: mongoose.Types.ObjectId, required: false, ref: 'User' },
  text: { type: String, required: true },
  name: { type: String, required: false },
  username: { type: String, required: false },
  relatedId: { type: String, required: false },
  attachments: [
    {
      mimetype: String,
      path: String,
    },
  ],
  createdAt: { type: Date, required: true },
  readAt: { type: Date, required: false },
});
