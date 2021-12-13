import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatController } from 'src/controllers/cb-chat.controller';
import { ApiUserDataEntity } from 'src/entities/eb-api-user-data.entity';
import { ChatterEntity } from 'src/entities/eb-chatter.entity';
import { ConversationEntity } from 'src/entities/eb-conversation.entity';
import { MessageEntity } from 'src/entities/eb-message.entity';
import { WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';
import { ChatGateway } from 'src/gateways/chat.gateway';
import { ChatService } from 'src/services/sb-chat.service';
import { UserService } from 'src/services/sb-user.service';
import { Repository } from 'typeorm';


@Module({
    imports: [Repository,  TypeOrmModule.forFeature([ ChatterEntity, ConversationEntity, WebAppUserEntity, MessageEntity, ApiUserDataEntity])],
    providers: [ ChatService, UserService, ChatGateway],
    controllers: [ChatController],
})
export class ChatModule {}
