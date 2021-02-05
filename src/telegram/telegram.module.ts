import { forwardRef, Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramBotService } from './bot.service';
import { TelegramController } from './telegram.controller';
import { TeamMessagesModule } from '../team-messages/team-messages.module';
import { TeamMessagesService } from '../team-messages/team-messages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamMessageSchema } from '../team-messages/schemas/team-message.schema';
import { TeamModule } from '../team/team.module';
import { TeamService } from '../team/team.service';
import { SocketModule } from '../socket/socket.module';

@Module({
  imports: [
    TeamModule,
    forwardRef(() => TeamMessagesModule),
    MongooseModule.forFeature([
      { name: 'TeamMessage', schema: TeamMessageSchema },
      { name: 'Team', schema: TeamMessageSchema },
    ]),
    SocketModule,
  ],
  providers: [
    TelegramService,
    TelegramBotService,
    TeamMessagesService,
    TeamService,
  ],
  controllers: [TelegramController],
  exports: [TelegramService],
})
export class TelegramModule {}
