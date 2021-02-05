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
import { Public } from '../auth/guards/public-route.guard';

@ApiBearerAuth()
@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
  constructor(
    private readonly ticketService: TicketsService,
    private readonly messageService: TicketMessagesService,
  ) {}

  @Get('/')
  async getList(): Promise<ITicketDocument[]> {
    return this.ticketService.get();
  }

  @Get('/last')
  async getLastTickets(@Query() { limit }): Promise<ITicketDocument[]> {
    return this.ticketService.getOrderedByLastMessage(+limit || 0);
  }

  @ApiParam({ name: 'id', type: String })
  @Get('/last/:id')
  async getLastTicketsByProject(
    @Query() { limit },
    @Param() { id },
  ): Promise<ITicketDocument[]> {
    return this.ticketService.getLastTicketsByProject(id, +limit || 0);
  }

  //TODO protect route
  @Public()
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

  //TODO protect route
  @Public()
  @ApiParam({ name: 'id', type: String })
  @Get('/:id/messages')
  async byTicket(@Param() { id }): Promise<ITicketMessageDocument[]> {
    return this.messageService.byTicket(id);
  }

  @Post('/:id/messages/read')
  async markRead(@Param() { id }): Promise<IUpdatedEntitiesResponse> {
    return this.messageService.markAsRead(id);
  }
}
