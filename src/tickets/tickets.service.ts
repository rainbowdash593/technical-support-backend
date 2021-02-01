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
    const tickets = this.ticketModel
      .find()
      .populate('project')
      .populate({ path: 'lastMessage', populate: { path: 'user' } })
      .sort({ lastMessageAt: 'desc' });
    return limit ? tickets.limit(limit) : tickets;
  }

  async find(id: string): Promise<ITicketDocument> {
    return this.ticketModel.findOne({ _id: id });
  }

  async findBy(filter): Promise<ITicketDocument> {
    return this.ticketModel.findOne(filter);
  }

  async create(createTicketDto: CreateTicketDto): Promise<ITicketDocument> {
    const ticket = new this.ticketModel(
      _.assignIn(createTicketDto, {
        createdAt: moment().toDate(),
        updatedAt: moment().toDate(),
      }),
    );
    return await ticket.save();
  }
}
