import { IMessenger } from './messanger.interface';

export interface IReadableUser {
  readonly _id: string;
  readonly name: string;
  readonly phone: string;
  readonly email: string;
  readonly messengers: IMessenger[];
  readonly roles: string[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly loggedAt: Date;
  accessToken?: string;
}
