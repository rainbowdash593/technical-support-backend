import * as _ from 'lodash';
import * as moment from 'moment';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ITeamMessageDocument } from './interfaces/team-message.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageProviderEnum } from './enums/message-provider.enum';
import { TeamService } from '../team/team.service';
import { CreateOutgoingTeamMessageDto } from './dto/create-outgoing-team-message.dto';
import { IReadableUser } from '../users/interfaces/readable-user.interface';
import { TelegramService } from '../telegram/telegram.service';
import { MessageGateway } from '../socket/socket.gateway';
import { BroadcastEvents } from '../socket/enums/broadcast-events.enum';

@Injectable()
export class TeamMessagesService {
  constructor(
    @InjectModel('TeamMessage')
    private readonly messageModel: Model<ITeamMessageDocument>,
    private readonly teamService: TeamService,
    private readonly telegramService: TelegramService,
    private readonly messageGateway: MessageGateway,
  ) {}

  async broadcastMessage(message: ITeamMessageDocument) {
    this.messageGateway.server.emit(BroadcastEvents.TEAM_MESSAGE, message);
  }

  async storeTelegramMessage(tgMessage): Promise<ITeamMessageDocument> | null {
    const { chat, from, text, message_id } = tgMessage;
    const chatId = '' + chat.id;
    const team = await this.teamService.findByTelegramChat(chatId);
    if (!team) return null;
    const message = await new this.messageModel({
      text,
      provider: MessageProviderEnum.TELEGRAM,
      team: team._id,
      name: `${from.first_name} ${from.last_name}`,
      username: from.username,
      relatedId: message_id,
      createdAt: moment().toDate(),
    });
    const savedMessage = await message
      .save()
      .then((m) => m.populate('team').execPopulate());
    this.broadcastMessage(savedMessage);
    return savedMessage;
  }

  async outgoingTelegramMessage(
    user: IReadableUser,
    createOutgoingTeamMessageDto: CreateOutgoingTeamMessageDto,
  ): Promise<ITeamMessageDocument> {
    const team = await this.teamService.find(createOutgoingTeamMessageDto.team);
    if (!team) throw new BadRequestException('Team not found!');
    const message = new this.messageModel(
      _.assignIn(createOutgoingTeamMessageDto, {
        user: user._id,
        provider: 'telegram',
        createdAt: moment().toDate(),
      }),
    );
    await this.telegramService.sendMessage(
      team.telegramChat,
      createOutgoingTeamMessageDto.text,
    );
    return message.save();
  }
}
