import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { MessageGateway } from './socket.gateway';

@Module({
  providers: [SocketService, MessageGateway],
  exports: [SocketService, MessageGateway],
})
export class SocketModule {}
