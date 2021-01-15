import { Document } from 'mongoose';
import { IMessenger } from './messanger.interface';
import { IReadableUser } from './readable-user.interface';

export interface IUser extends Document {
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  readonly password: string;
  readonly messengers: IMessenger[];
  readonly roles: string[];
  readonly created_at: Date;
  readonly updated_at: Date;
  readonly logged_at?: Date;
}

export interface IUserDocument extends IUser {
  toReadableUser(token?: string): IReadableUser;
}
