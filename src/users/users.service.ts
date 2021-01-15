import * as _ from 'lodash';
import * as moment from 'moment';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUserDocument } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly saltRounds = 10;

  constructor(
    @InjectModel('User') private readonly userModel: Model<IUserDocument>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(password, salt);
  }

  async create(
    createUserDto: CreateUserDto,
    roles: string[],
  ): Promise<IUserDocument> {
    const hash = await this.hashPassword(createUserDto.password);
    const createdUser = new this.userModel(
      _.assignIn(createUserDto, {
        roles,
        password: hash,
        created_at: moment().toDate(),
        updated_at: moment().toDate(),
      }),
    );
    return await createdUser.save();
  }

  async find(id: string): Promise<IUserDocument> {
    return await this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<IUserDocument> {
    return await this.userModel.findOne({ email }).exec();
  }

  async update(id: string, payload: Partial<IUserDocument>) {
    return this.userModel.updateOne({ _id: id }, payload);
  }
}
