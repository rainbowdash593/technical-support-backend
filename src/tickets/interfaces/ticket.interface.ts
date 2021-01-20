import { Document } from 'mongoose';
import { TicketStatus } from '../enums/ticket-status.enum';
import { IRelatedUser } from './related-user.interface';

export interface ITicket extends Document {
  readonly status: TicketStatus;
  readonly tags: string[];
  readonly projectId: string;
  readonly relatedId: number;
  readonly user: IRelatedUser;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly lastMessageAt?: Date;
}

export interface ITicketDocument extends ITicket {}
