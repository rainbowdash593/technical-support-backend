import { Document } from 'mongoose';
import { TicketStatus } from '../enums/ticket-status.enum';
import { IRelatedUser } from './related-user.interface';
import { ITicketMessageDocument } from '../../ticket-messages/interfaces/ticket-message.interface';
import { IProjectDocument } from '../../projects/interfaces/project.interface';

export interface ITicket extends Document {
  readonly status: TicketStatus;
  readonly tags: string[];
  readonly project: string | IProjectDocument;
  readonly relatedId: number;
  readonly user: IRelatedUser;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly lastMessage?: string | ITicketMessageDocument;
  readonly lastMessageAt?: Date;
}

export interface ITicketDocument extends ITicket {
  updateLastMessageDate(
    message: ITicketMessageDocument,
    date?: Date,
  ): Promise<void>;
}
