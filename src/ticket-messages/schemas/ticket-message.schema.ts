import * as mongoose from 'mongoose';
import { TicketMessageType } from '../enums/message-type.enum';

export const TicketMessageSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: Object.values(TicketMessageType),
    required: true,
  },
  text: { type: String, required: true },
  relatedId: { type: Number, required: false },
  relatedUser: { id: Number, email: String },
  userId: { type: mongoose.Types.ObjectId, required: false, ref: 'User' },
  ticketId: { type: mongoose.Types.ObjectId, required: true, ref: 'Ticket' },
  attachments: [
    {
      mimetype: String,
      path: String,
    },
  ],
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  postedAt: { type: Date, required: true },
  readAt: { type: Date, required: false },
});
