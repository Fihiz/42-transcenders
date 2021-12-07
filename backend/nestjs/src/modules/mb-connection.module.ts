import { Module } from '@nestjs/common';
import { ChatServiceBis } from 'src/services/sb-chat-bis.service';
import { ConnectedGateway } from '../gateways/connected.gateway'

@Module({
  providers: [ConnectedGateway, ChatServiceBis]
})
export class ConnectionModule {}