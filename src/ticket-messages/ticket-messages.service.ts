import * as _ from 'lodash';
import * as moment from 'moment';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IReadableUser } from '../users/interfaces/readable-user.interface';
import { ITicketMessageDocument } from './interfaces/ticket-message.interface';
import { TicketsService } from '../tickets/tickets.service';
import { IUpdatedEntitiesResponse } from '../common/interfaces/updated-entities-response.interface';
import { CreateIncomingMessageDto } from './dto/create-incoming-message.dto';
import { TicketMessageType } from './enums/message-type.enum';
import { CreateOutgoingMessageDto } from './dto/create-outgoing-message.dto';
import { MessageGateway } from '../socket/socket.gateway';
import { BroadcastEvents } from '../socket/enums/broadcast-events.enum';

@Injectable()
export class TicketMessagesService {
  constructor(
    @InjectModel('TicketMessage')
    private readonly messageModel: Model<ITicketMessageDocument>,
    private readonly ticketsService: TicketsService,
    private readonly messageGateway: MessageGateway,
  ) {}

  async get(): Promise<ITicketMessageDocument[]> {
    return this.messageModel.find();
  }

  async find(id: string): Promise<ITicketMessageDocument> {
    return this.messageModel.findOne({ _id: id });
  }

  async broadcastMessage(message: ITicketMessageDocument) {
    this.messageGateway.server.emit(BroadcastEvents.TICKET_MESSAGE, message);
  }

  async byTicket(ticketId: string): Promise<ITicketMessageDocument[]> {
    return this.messageModel
      .find({ ticket: ticketId })
      .populate('user')
      .sort({ createdAt: 'asc' });
  }

  async markAsRead(ticketId: string): Promise<IUpdatedEntitiesResponse> {
    const result = await this.messageModel.updateMany(
      { ticketId: ticketId },
      {
        readAt: moment().toDate(),
      },
    );
    return { success: result.ok, updatedCount: result.n };
  }

  async incoming(
    createIncomingMessageDto: CreateIncomingMessageDto,
  ): Promise<ITicketMessageDocument> {
    const { text, attachments, ticketId } = createIncomingMessageDto;
    const ticket = await this.ticketsService.findBy({ relatedId: ticketId });
    if (!ticket) throw new NotFoundException('Ticket not found!');

    const message = new this.messageModel({
      text,
      attachments: attachments || [],
      relatedId: createIncomingMessageDto.id,
      relatedUser: createIncomingMessageDto.user,
      ticket: ticket._id,
      type: TicketMessageType.INCOMING,
      createdAt: moment().toDate(),
      updatedAt: moment().toDate(),
      postedAt: moment.unix(createIncomingMessageDto.postedAt).toDate(),
    });
    const savedMessage = await message
      .save()
      .then((m) => m.populate('ticket').execPopulate());
    await ticket.updateLastMessageDate(savedMessage);
    this.broadcastMessage(savedMessage);
    return savedMessage;
  }

  async outgoing(
    user: IReadableUser,
    createOutgoingMessageDto: CreateOutgoingMessageDto,
  ): Promise<ITicketMessageDocument> {
    const ticket = await this.ticketsService.findBy({
      _id: createOutgoingMessageDto.ticket,
    });
    if (!ticket) throw new NotFoundException('Ticket not found!');
    const message = new this.messageModel(
      _.assignIn(createOutgoingMessageDto, {
        type: TicketMessageType.OUTGOING,
        user: user._id,
        createdAt: moment().toDate(),
        updatedAt: moment().toDate(),
        postedAt: moment().toDate(),
      }),
    );
    const savedMessage = await message.save();
    await ticket.updateLastMessageDate(savedMessage);
    return await savedMessage
      .populate('user')
      .populate('ticket')
      .execPopulate();
  }
}
