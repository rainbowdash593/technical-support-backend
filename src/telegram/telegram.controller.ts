import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  // constructor(telegramService: TelegramService) {}
  //
  // @Get()
  // getBotDialog(@Res() res) {
  //   this.telegramService.handleMessages();
  //   res.status(HttpStatus.OK).send('Bot service started');
  // }
}
