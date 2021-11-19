import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatterEntity } from 'src/database/entities/chatter/chatter.entity';
import { ChatterModule } from 'src/database/entities/chatter/chatter.module';
import { ChatterService } from 'src/database/entities/chatter/chatter.service';
import { ConversationEntity } from 'src/database/entities/conversation/conversation.entity';
import { ConversationModule } from 'src/database/entities/conversation/conversation.module';
import { ConversationService } from 'src/database/entities/conversation/conversation.service';
import { MessageEntity } from 'src/database/entities/message/message.entity';
import { MessageModule } from 'src/database/entities/message/message.module';
import { MessageService } from 'src/database/entities/message/message.service';
import { WebAppUserEntity } from 'src/database/entities/webAppUser/webAppUser.entity';
import { WebAppUserModule } from 'src/database/entities/webAppUser/webAppUser.module';
import { WebAppUserService } from 'src/database/entities/webAppUser/webAppUser.service';
import { Repository } from 'typeorm';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  imports: [ Repository, TypeOrmModule.forFeature([ChatterEntity, ConversationEntity, WebAppUserEntity, MessageEntity])],
  providers: [ChatService, ChatGateway, ChatterService, ConversationService, WebAppUserService, MessageService,],
})
export class ChatModule {}
