import {
  Body,
  Controller,
  Request,
  ValidationPipe,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ITeamMessageDocument } from './interfaces/team-message.interface';
import { TeamMessagesService } from './team-messages.service';
import { CreateOutgoingTeamMessageDto } from './dto/create-outgoing-team-message.dto';
import { MessageGateway } from '../socket/socket.gateway';

@ApiTags('team-messages')
@ApiBearerAuth()
@Controller('team-messages')
export class TeamMessagesController {
  constructor(private readonly teamMessagesService: TeamMessagesService) {}

  @Post('/telegram')
  async telegram(
    @Request() req,
    @Body(new ValidationPipe())
    createOutgoingTeamMessageDto: CreateOutgoingTeamMessageDto,
  ): Promise<ITeamMessageDocument> {
    return this.teamMessagesService.outgoingTelegramMessage(
      req.user,
      createOutgoingTeamMessageDto,
    );
  }
}
