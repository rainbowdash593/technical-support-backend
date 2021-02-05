import * as TelegramBot from 'node-telegram-bot-api';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TelegramService {
  async sendMessage(chatId: string, text: string): Promise<boolean> {
    const token = process.env.TELEGRAM_TOKEN;
    const bot = new TelegramBot(token);
    return bot.sendMessage(+chatId, text);
  }
}
