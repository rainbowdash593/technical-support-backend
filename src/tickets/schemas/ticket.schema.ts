import * as mongoose from 'mongoose';
import { RelatedUserType } from '../enums/related-user-type.enum';
import { TicketStatus } from '../enums/ticket-status.enum';

export const TicketSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: Object.values(TicketStatus),
    default: TicketStatus.Open,
  },
  tags: { type: [String], required: false },
  projectId: { type: mongoose.Types.ObjectId, required: true, ref: 'Project' },
  relatedId: { type: Number, required: true },
  user: {
    id: { type: Number, required: true },
    email: { type: String, required: true },
    type: { enum: Object.values(RelatedUserType), required: true },
    partner: {
      id: { type: Number, required: true },
      email: { type: String, required: true },
    },
    manager: {
      id: { type: Number, required: true },
      email: { type: String, required: true },
    },
  },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  lastMessageAt: { type: Date, required: false },
});
