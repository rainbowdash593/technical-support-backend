import { RelatedUserType } from '../enums/related-user-type.enum';

export interface IRelatedUserPartner {
  readonly id: number;
  readonly email: string;
}

export interface IRelatedUserManager {
  readonly id: number;
  readonly email: string;
}

export interface IRelatedUser {
  readonly id: number;
  readonly email: string;
  readonly type: RelatedUserType;
  readonly partner: IRelatedUserPartner;
  readonly manager?: IRelatedUserManager;
}
