import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamMessagesController } from './team-messages.controller';
import { TeamMessagesService } from './team-messages.service';
import { TeamMessageSchema } from './schemas/team-message.schema';
import { TeamModule } from '../team/team.module';
import { TeamService } from '../team/team.service';
import { TeamSchema } from '../team/shemas/team.schema';
import { TelegramModule } from '../telegram/telegram.module';
import { TelegramService } from '../telegram/telegram.service';
import { SocketModule } from '../socket/socket.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'TeamMessage', schema: TeamMessageSchema },
      { name: 'Team', schema: TeamSchema },
    ]),
    TeamModule,
    forwardRef(() => TelegramModule),
    TelegramService,
    SocketModule,
  ],
  controllers: [TeamMessagesController],
  providers: [TeamMessagesService, TeamService],
  exports: [TeamMessagesService],
})
export class TeamMessagesModule {}
