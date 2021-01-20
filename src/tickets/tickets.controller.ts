import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { ITicketDocument } from './interfaces/ticket.interface';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketMessagesService } from '../ticket-messages/ticket-messages.service';
import { ITicketMessageDocument } from '../ticket-messages/interfaces/ticket-message.interface';
import { IUpdatedEntitiesResponse } from '../common/interfaces/updated-entities-response.interface';

@ApiBearerAuth()
@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
  constructor(
    private readonly ticketService: TicketsService,
  ) // private readonly messageService: TicketMessagesService,
  {}

  @Get('/')
  async getList(): Promise<ITicketDocument[]> {
    return this.ticketService.get();
  }

  @Get('/last')
  async getByLastMessage(@Query() { limit }): Promise<ITicketDocument[]> {
    return this.ticketService.getOrderedByLastMessage(+limit || 5);
  }

  @ApiParam({ name: 'id', type: String })
  @Get('/:id')
  async find(@Param() { id }): Promise<ITicketDocument> {
    return this.ticketService.find(id);
  }

  @Post('/create')
  async create(
    @Body(new ValidationPipe()) createTicketDto: CreateTicketDto,
  ): Promise<ITicketDocument> {
    return this.ticketService.create(createTicketDto);
  }

  // @ApiParam({ name: 'id', type: String })
  // @Get('/:id/messages')
  // async byTicket(@Param() { id }): Promise<ITicketMessageDocument[]> {
  //   return this.messageService.byTicket(id);
  // }
  //
  // @Post('/:id/messages/read')
  // async markRead(@Param() { id }): Promise<IUpdatedEntitiesResponse> {
  //   return this.messageService.markAsRead(id);
  // }
}
