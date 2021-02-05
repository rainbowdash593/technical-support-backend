import { forwardRef, Module } from '@nestjs/common';
import { TicketMessagesController } from './ticket-messages.controller';
import { TicketMessagesService } from './ticket-messages.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketMessageSchema } from './schemas/ticket-message.schema';
import { TicketsModule } from '../tickets/tickets.module';
import { SocketModule } from '../socket/socket.module';

@Module({
  imports: [
    forwardRef(() => TicketsModule),
    MongooseModule.forFeature([
      { name: 'TicketMessage', schema: TicketMessageSchema },
    ]),
    SocketModule,
  ],
  controllers: [TicketMessagesController],
  providers: [TicketMessagesService],
  exports: [TicketMessagesService],
})
export class TicketMessagesModule {}
