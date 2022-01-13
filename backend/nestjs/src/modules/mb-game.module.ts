import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatController } from 'src/controllers/cb-chat.controller';
import { GameController } from 'src/controllers/cb-game.controller';
import { AchievementEntity } from 'src/entities/eb-achievement.entity';
import { ApiUserDataEntity } from 'src/entities/eb-api-user-data.entity';
import { AwardEntity } from 'src/entities/eb-award.entity';
import { ChatterEntity } from 'src/entities/eb-chatter.entity';
import { ConversationEntity } from 'src/entities/eb-conversation.entity';
import { GameTypeEntity } from 'src/entities/eb-game-type.entity';
import { MessageEntity } from 'src/entities/eb-message.entity';
import { ParticipantEntity } from 'src/entities/eb-participant.entity';
import { PongGameEntity } from 'src/entities/eb-pong-game.entity';
import { RelationEntity } from 'src/entities/eb-relation.entity';
import { StatEntity } from 'src/entities/eb-stat.entity';
import { WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';
import { ChatGateway } from 'src/gateways/chat.gateway';
import { ConnectedGateway } from 'src/gateways/connected.gateway';
import { DisplayProfileUpdate } from 'src/gateways/displayProfileUpdate.gateway';
import { GameGateway } from 'src/gateways/game.gateway';
import { ChatService } from 'src/services/sb-chat.service';
import { ChatterService } from 'src/services/sb-chatter.service';
import { ConvService } from 'src/services/sb-conv.service';
import { GameService } from 'src/services/sb-game.service';
import { SocialService } from 'src/services/sb-social.service';
import { StatsService } from 'src/services/sb-stats.service';
import { UserService } from 'src/services/sb-user.service';

@Module({
    providers: [GameService, GameGateway, StatsService, ConnectedGateway, ChatService, ConvService, UserService, ChatterService, ChatGateway, SocialService, DisplayProfileUpdate],
    imports: [TypeOrmModule.forFeature([GameTypeEntity, RelationEntity, ParticipantEntity, PongGameEntity, StatEntity, AwardEntity, AchievementEntity, MessageEntity, ChatterEntity, ConversationEntity, WebAppUserEntity, ApiUserDataEntity])],
    controllers: [GameController, ChatController],
})
export class GameModule {}
