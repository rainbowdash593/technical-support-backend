import * as _ from 'lodash';
import * as mongoose from 'mongoose';
import { Role } from '../enums/role.enum';
import { IReadableUser } from '../interfaces/readable-user.interface';
import { ProtectedUserFields } from '../enums/protected-fields.enum';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  messengers: [
    {
      name: { type: String, required: true },
      username: { type: String, required: true },
    },
  ],
  roles: { type: [String], required: true, enum: Object.values(Role) },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  logged_at: { type: Date, required: false },
});

UserSchema.index({ email: 1 }, { unique: true });

UserSchema.methods.toReadableUser = function (token: string): IReadableUser {
  const readableUser = this.toObject() as IReadableUser;
  if (token) readableUser.accessToken = token;
  return _.omit(
    readableUser,
    Object.values(ProtectedUserFields),
  ) as IReadableUser;
};
