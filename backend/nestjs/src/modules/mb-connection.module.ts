import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiUserDataEntity } from 'src/entities/eb-api-user-data.entity';
import { ChatterEntity } from 'src/entities/eb-chatter.entity';
import { ConversationEntity } from 'src/entities/eb-conversation.entity';
import { MessageEntity } from 'src/entities/eb-message.entity';
import { WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';
import { ConvService } from 'src/services/sb-conv.service';
import { ChatService } from 'src/services/sb-chat.service';
import { UserService } from 'src/services/sb-user.service';
import { ConnectedGateway } from '../gateways/connected.gateway'
import { ChatterService } from 'src/services/sb-chatter.service';
import { RelationEntity } from 'src/entities/eb-relation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity, ConversationEntity, ChatterEntity, WebAppUserEntity, ApiUserDataEntity, RelationEntity])],
  providers: [ChatService, UserService, ConvService, ChatterService]
})
export class ConnectionModule {}