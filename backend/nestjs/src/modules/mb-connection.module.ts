import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatterEntity } from 'src/entities/eb-chatter.entity';
import { ConversationEntity } from 'src/entities/eb-conversation.entity';
import { MessageEntity } from 'src/entities/eb-message.entity';
import { ChatService } from 'src/services/sb-chat.service';
import { ConnectedGateway } from '../gateways/connected.gateway'

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, ConversationEntity, ChatterEntity])],
  providers: [ConnectedGateway, ChatService]
})
export class ConnectionModule {}