import { Document, Types } from 'mongoose';

export interface IProject extends Document {
  readonly name: string;
  readonly token: string;
  readonly url: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deleted: boolean;
  readonly deletedAt?: Date;
  readonly deletedBy?: Types._ObjectId;
}

export interface IProjectDocument extends IProject {}
