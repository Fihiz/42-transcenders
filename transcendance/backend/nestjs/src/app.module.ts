import "reflect-metadata";
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { ChatService } from './chat/chat.service';
import { AuthController } from './auth/auth.controller';
import { ConnectionModule } from './connection/connection.module';
import { StatModule } from './database/entities/stat/stat.module';
import { StatEntity } from './database/entities/stat/stat.entity';
import { StatService } from './database/entities/stat/stat.service';
import { AwardEntity } from './database/entities/award/award.entity';
import { MessageEntity } from './database/entities/message/message.entity';
import { ChatterEntity } from './database/entities/chatter/chatter.entity';
import { DoubleAuthController } from './double-auth/double-auth.controller';
import { GameTypeEntity } from './database/entities/gameType/gameType.entity';
import { PongGameEntity } from './database/entities/pongGame/pongGame.entity';
import { RelationEntity } from './database/entities/relation/relation.entity';
import { WebAppUserModule } from './database/entities/webAppUser/webAppUser.module';
import { WebAppUserEntity } from './database/entities/webAppUser/webAppUser.entity';
import { InvitationEntity } from './database/entities/invitation/invitation.entity';
import { WebAppUserService } from './database/entities/webAppUser/webAppUser.service';
import { AchievementEntity } from './database/entities/achievement/achievement.entity';
import { ApiUserDataEntity } from './database/entities/apiUserData/apiUserData.entity';
import { ParticipantEntity } from './database/entities/participant/participant.entity';
import { ApiUserDataService } from './database/entities/apiUserData/apiUserData.service';
import { ConversationEntity } from './database/entities/conversation/conversation.entity';
import { ConversationService } from "./database/entities/conversation/conversation.service";
import { ChatterService } from "./database/entities/chatter/chatter.service";
import { ChatterModule } from "./database/entities/chatter/chatter.module";
import { ConversationModule } from "./database/entities/conversation/conversation.module";
import { MessageModule } from "./database/entities/message/message.module";
import { MessageService } from "./database/entities/message/message.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database',
      username: "admin",
      password: "admin",
      database: "db_pong",
      entities: [AchievementEntity,
      ApiUserDataEntity,
      AwardEntity,
      ChatterEntity,
      ConversationEntity,
      GameTypeEntity,
      InvitationEntity,
      MessageEntity,
      ParticipantEntity,
      PongGameEntity,
      RelationEntity,
      StatEntity,
      WebAppUserEntity],
      autoLoadEntities: true,
      synchronize: true
    }),
    ChatModule,
    WebAppUserModule,
    StatModule,
    ConnectionModule,
    MessageModule,
    ChatterModule,
    ConversationModule,
    TypeOrmModule.forFeature([
      WebAppUserEntity, 
      StatEntity, 
      MessageEntity,
      ConversationEntity, 
      AchievementEntity,
      GameTypeEntity,
      ApiUserDataEntity,
      AwardEntity,
      PongGameEntity,
      RelationEntity,
      ChatterEntity,
      ParticipantEntity,
      InvitationEntity,
    ]),
  ],
  controllers: [AppController,  DoubleAuthController, AuthController],
  providers: [AppService,
    WebAppUserService, 
    StatService, 
    AuthService, 
    ApiUserDataService,
    ChatterService,
    ConversationService,
    MessageService],
})
export class AppModule {}
