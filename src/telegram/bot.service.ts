import * as TelegramBot from 'node-telegram-bot-api';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { TeamMessagesService } from '../team-messages/team-messages.service';

@Injectable()
export class TelegramBotService implements OnModuleInit {
  constructor(private teamMessagesService: TeamMessagesService) {}

  onModuleInit() {
    this.handleMessages();
  }

  handleMessages() {
    const token = process.env.TELEGRAM_TOKEN;
    const bot = new TelegramBot(token, { polling: true });
    bot.on('message', async (msg) => {
      await this.teamMessagesService.storeTelegramMessage(msg);
      console.log(msg);
    });
  }
}
