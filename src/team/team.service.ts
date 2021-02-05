import * as _ from 'lodash';
import * as moment from 'moment';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ITeamDocument } from './interfaces/team.interface';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel('Team')
    private readonly teamModel: Model<ITeamDocument>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<ITeamDocument> {
    const team = await new this.teamModel(
      _.assignIn(createTeamDto, {
        createdAt: moment().toDate(),
        updatedAt: moment().toDate(),
      }),
    );
    return team.save();
  }

  async get(): Promise<ITeamDocument[]> {
    return this.teamModel.find();
  }

  async find(id: string): Promise<ITeamDocument> {
    return this.teamModel.findOne({ _id: id });
  }

  async findByTelegramChat(chatId: string): Promise<ITeamDocument> {
    return this.teamModel.findOne({ telegramChat: chatId });
  }
}
