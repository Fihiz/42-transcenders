import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoubleAuthController } from './double-auth/double-auth.controller';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import "reflect-metadata";
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebAppUserEntity } from './entity/webAppUser/webAppUser.entity';
import { WebAppUserModule } from './entity/webAppUser/webAppUser.module';
import { StatModule } from './entity/Stat/stat.module';
import { StatEntity } from './entity/Stat/stat.entity';
import { WebAppUserService } from './entity/webAppUser/webAppUser.service';
import { StatService } from './entity/Stat/stat.service';
import { MessagesEntity } from './entity/messages/messages.entity';
import { ConversationEntity } from './entity/conversation/conversation.entity';
import { AchievementEntity } from './entity/achievement/achievement.entity';
import { GameTypeEntity } from './entity/gameType/gameType.entity';
import { ApiUserDataService } from './entity/apiUserData/apiUserData.service';
import { ApiUserDataEntity } from './entity/apiUserData/apiUserData.entity';
import { AwardEntity } from './entity/award/award.entity';
import { PongGameEntity } from './entity/pongGame/pongGame.entity';
import { RelationEntity } from './entity/relation/relation.entity';
import { ChatterEntity } from './entity/chatter/chatter.entity';
import { AuthService } from './auth/auth.service';
import { ParticipantEntity } from './entity/participant/participant.entity';
import { InvitationEntity } from './entity/invitation/invitation.entity';

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
      entities: [WebAppUserEntity, StatEntity],
      autoLoadEntities: true,
      synchronize: true
    }),
    ChatModule,
    WebAppUserModule,
    StatModule,
    TypeOrmModule.forFeature([WebAppUserEntity, 
      StatEntity, 
      MessagesEntity, 
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
  providers: [AppService,WebAppUserService, StatService, AuthService, ApiUserDataService],
})
export class AppModule {}
