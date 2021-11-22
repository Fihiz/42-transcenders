import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatController } from 'src/controllers/cb-chat.controller';
import { ChatterEntity } from 'src/entities/eb-chatter.entity';
import { ConversationEntity } from 'src/entities/eb-conversation.entity';
import { MessageEntity } from 'src/entities/eb-message.entity';
import { ChatService } from 'src/services/sb-chat.service';

@Module({
    imports: [TypeOrmModule.forFeature([ChatterEntity, MessageEntity, ConversationEntity])],
    providers: [ChatService],
    controllers: [ChatController],
})
export class ChatModule {}
