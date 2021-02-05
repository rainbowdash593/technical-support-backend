import { Document } from 'mongoose';

export interface ITeam extends Document {
  readonly name: string;
  readonly telegramChat: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface ITeamDocument extends ITeam {}
