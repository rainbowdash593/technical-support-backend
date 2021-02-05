import { Document } from 'mongoose';
import { MessageProviderEnum } from '../enums/message-provider.enum';
import { IAttachment } from '../../ticket-messages/interfaces/attachment.interface';

export interface ITeamMessage extends Document {
  readonly provider: MessageProviderEnum;
  readonly team: string;
  readonly text: string;
  readonly name?: string;
  readonly user?: string;
  readonly relatedId?: string;
  readonly username?: string;
  readonly attachments?: IAttachment;
  readonly createdAt: Date;
  readonly readAt?: Date;
}

export interface ITeamMessageDocument extends ITeamMessage {}
