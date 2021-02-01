import * as mongoose from 'mongoose';
import { RelatedUserType } from '../enums/related-user-type.enum';
import { TicketStatus } from '../enums/ticket-status.enum';
import { IReadableUser } from '../../users/interfaces/readable-user.interface';
import { ProtectedUserFields } from '../../users/enums/protected-fields.enum';
import { ITicketMessageDocument } from '../../ticket-messages/interfaces/ticket-message.interface';
import * as moment from 'moment';

export const TicketSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: Object.values(TicketStatus),
    default: TicketStatus.Open,
  },
  tags: { type: [String], required: false },
  project: { type: mongoose.Types.ObjectId, required: true, ref: 'Project' },
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
  lastMessage: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: 'TicketMessage',
  },
  lastMessageAt: { type: Date, required: false },
});

TicketSchema.methods.updateLastMessageDate = async function (
  message: ITicketMessageDocument,
  date: Date = moment().toDate(),
): Promise<void> {
  this.lastMessageAt = date;
  this.lastMessage = message._id;
  this.save();
};
