import { Document } from 'mongoose';
import { IAttachment } from './attachment.interface';
import { TicketMessageType } from '../enums/message-type.enum';
import { IRelatedUser } from '../../tickets/interfaces/related-user.interface';
import { IUserDocument } from '../../users/interfaces/user.interface';
import { ITicketDocument } from '../../tickets/interfaces/ticket.interface';

export interface ITicketMessage extends Document {
  readonly type: TicketMessageType;
  readonly text: string;
  readonly relatedId?: number;
  readonly relatedUser?: Partial<IRelatedUser>;
  readonly user?: string | IUserDocument;
  readonly ticket: string | ITicketDocument;
  readonly attachments: IAttachment[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly postedAt: Date;
  readonly readAt?: Date;
}

export interface ITicketMessageDocument extends ITicketMessage {}
