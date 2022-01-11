import { Module } from '@nestjs/common';
import { AdminViewGateway } from 'src/gateways/admin-view.gateway';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { UserService } from 'src/services/sb-user.service';
import { WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';
import { ApiUserDataEntity } from 'src/entities/eb-api-user-data.entity';
import { AdminService } from 'src/services/sb-admin.service';
import { ConversationEntity } from 'src/entities/eb-conversation.entity';
import { ChatterEntity } from 'src/entities/eb-chatter.entity';
import { ChatService } from 'src/services/sb-chat.service';
import { MessageEntity } from 'src/entities/eb-message.entity';
import { ConvService } from 'src/services/sb-conv.service';
import { ChatterService } from 'src/services/sb-chatter.service';
import { RelationEntity } from 'src/entities/eb-relation.entity';


@Module({
    imports: [Repository, TypeOrmModule.forFeature([ RelationEntity, WebAppUserEntity, ApiUserDataEntity, ConversationEntity, ChatterEntity, MessageEntity])],
    providers: [ AdminViewGateway, UserService, AdminService, ChatService, ConvService, ChatterService],
    controllers: [],
})
export class AdminViewModule {}
