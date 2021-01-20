import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { TicketMessagesService } from './ticket-messages.service';
import { ITicketMessageDocument } from './interfaces/ticket-message.interface';
import { CreateIncomingMessageDto } from './dto/create-incoming-message.dto';
import { CreateOutgoingMessageDto } from './dto/create-outgoing-message.dto';

@ApiBearerAuth()
@ApiTags('ticket-messages')
@Controller('ticket-messages')
export class TicketMessagesController {
  constructor(private readonly messageService: TicketMessagesService) {}

  @Get('/')
  async getList(): Promise<ITicketMessageDocument[]> {
    return this.messageService.get();
  }

  @ApiParam({ name: 'id', type: String })
  @Get('/:id')
  async find(@Param() { id }): Promise<ITicketMessageDocument> {
    return this.messageService.find(id);
  }

  @Post('/incoming')
  async incomingMessage(
    @Body(new ValidationPipe())
    createIncomingMessageDto: CreateIncomingMessageDto,
  ): Promise<ITicketMessageDocument> {
    return this.messageService.incoming(createIncomingMessageDto);
  }

  @Post('/outgoing')
  async outgoingMessage(
    @Request() req,
    @Body(new ValidationPipe())
    createOutgoingMessageDto: CreateOutgoingMessageDto,
  ): Promise<ITicketMessageDocument> {
    return this.messageService.outgoing(req.user, createOutgoingMessageDto);
  }
}
