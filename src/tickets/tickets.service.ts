import * as _ from 'lodash';
import * as moment from 'moment';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITicketDocument } from './interfaces/ticket.interface';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel('Ticket') private readonly ticketModel: Model<ITicketDocument>,
  ) {}

  async get(): Promise<ITicketDocument[]> {
    return this.ticketModel.find();
  }

  async getOrderedByLastMessage(limit: number): Promise<ITicketDocument[]> {
    return this.ticketModel.find().sort({ lastMessageAt: 'desc' }).limit(limit);
  }

  async find(id: string): Promise<ITicketDocument> {
    return this.ticketModel.findOne({ _id: id });
  }

  async findBy(filter): Promise<ITicketDocument> {
    return this.ticketModel.findOne(filter);
  }

  async create(createTicketDto: CreateTicketDto): Promise<ITicketDocument> {
    const member = new this.ticketModel(
      _.assignIn(createTicketDto, {
        createdAt: moment().toDate(),
        updatedAt: moment().toDate(),
      }),
    );
    return await member.save();
  }

  async updateLastMessageDate(
    id: string,
    date: Date = moment().toDate(),
  ): Promise<void> {
    await this.ticketModel.updateOne(
      { _id: id },
      {
        lastMessageAt: date,
      },
    );
  }
}
