import { IMessenger } from './messanger.interface';

export interface IReadableUser {
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  readonly messengers: IMessenger[];
  readonly roles: string[];
  readonly created_at: Date;
  readonly updated_at: Date;
  readonly logged_at: Date;
  accessToken?: string;
}
