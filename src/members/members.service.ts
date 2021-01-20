import * as _ from 'lodash';
import * as moment from 'moment';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMemberDocument } from './interfaces/member.interface';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { IDeletedEntitiesResponse } from '../common/interfaces/deleted-entities-response.interface';
import { IUpdatedEntitiesResponse } from '../common/interfaces/updated-entities-response.interface';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel('Member') private readonly memberModel: Model<IMemberDocument>,
  ) {}

  async get(): Promise<IMemberDocument[]> {
    return await this.memberModel.find();
  }

  async find(id: string): Promise<IMemberDocument> {
    return await this.memberModel.findOne({ _id: id });
  }

  async create(createMemberDto: CreateMemberDto): Promise<IMemberDocument> {
    const member = new this.memberModel(
      _.assignIn(createMemberDto, {
        createdAt: moment().toDate(),
        updatedAt: moment().toDate(),
      }),
    );
    return await member.save();
  }

  async update(
    id: string,
    updateMemberDto: UpdateMemberDto,
  ): Promise<IUpdatedEntitiesResponse> {
    const result = await this.memberModel.updateOne(
      { _id: id },
      _.assignIn(updateMemberDto, {
        updatedAt: moment().toDate(),
      }),
    );
    return { success: result.ok, updatedCount: result.n };
  }

  async remove(id: string): Promise<IDeletedEntitiesResponse> {
    const isExists = await this.memberModel.exists({ _id: id });
    if (!isExists) throw new NotFoundException();
    const result = await this.memberModel.deleteOne({ _id: id });
    return { success: result.ok, deletedCount: result.n };
  }
}
