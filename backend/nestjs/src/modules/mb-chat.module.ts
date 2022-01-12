import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatController } from 'src/controllers/cb-chat.controller';
import { ApiUserDataEntity } from 'src/entities/eb-api-user-data.entity';
import { ChatterEntity } from 'src/entities/eb-chatter.entity';
import { ConversationEntity } from 'src/entities/eb-conversation.entity';
import { MessageEntity } from 'src/entities/eb-message.entity';
import { WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';
import { ChatGateway } from 'src/gateways/chat.gateway';
import { ChatterService } from 'src/services/sb-chatter.service';
import { ConvService } from 'src/services/sb-conv.service';
import { ChatService } from 'src/services/sb-chat.service';
import { UserService } from 'src/services/sb-user.service';
import { Repository } from 'typeorm';
import { ConvModule } from './mb-conv.module';
import { GameService } from 'src/services/sb-game.service';
import { GameTypeEntity } from 'src/entities/eb-game-type.entity';
import { PongGameEntity } from 'src/entities/eb-pong-game.entity';
import { StatsService } from 'src/services/sb-stats.service';
import { StatEntity } from 'src/entities/eb-stat.entity';
import { AwardEntity } from 'src/entities/eb-award.entity';
import { AchievementEntity } from 'src/entities/eb-achievement.entity';
import { ConnectedGateway } from 'src/gateways/connected.gateway';
import { RelationEntity } from 'src/entities/eb-relation.entity';
import { SocialService } from 'src/services/sb-social.service';


@Module({
    // imports: [Repository, ConvModule, TypeOrmModule.forFeature([ RelationEntity, ChatterEntity, ConversationEntity, WebAppUserEntity, MessageEntity, ApiUserDataEntity, GameTypeEntity, PongGameEntity, StatEntity, AwardEntity, AchievementEntity ])],
    // providers: [ ChatService, UserService, ChatGateway, ConvService, ChatterService, GameService, StatsService, ConnectedGateway, SocialService ],
    // controllers: [ChatController],
})
export class ChatModule {}
