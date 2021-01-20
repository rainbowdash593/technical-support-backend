import { Document } from 'mongoose';
import { IMessenger } from '../../users/interfaces/messanger.interface';

export interface IMember extends Document {
  readonly name: string;
  readonly tag: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  messengers: IMessenger[];
}

export interface IMemberDocument extends IMember {}
