import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CallbackController } from './callback/callback.controller';
import { DoubleAuthController } from './double-auth/double-auth.controller';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';

import "reflect-metadata";
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebAppUser } from './entity/webAppUser/webAppUser.entity';
import { webAppUserModule } from './entity/webAppUser/webAppUser.module';
import { StatModule } from './entity/Stat/stat.module';
import { StatEntity } from './entity/Stat/stat.entity';
import { webAppUserService } from './entity/webAppUser/webAppUser.service';
import { StatService } from './entity/Stat/stat.service';
import { MessagesService } from './entity/messages/messages.service';
import { MessagesEntity } from './entity/messages/messages.entity';
import { ConversationEntity } from './entity/conversation/conversation.entity';
import { AchievementEntity } from './entity/achievement/achievement.entity';
import { GameTypeService } from './entity/gameType/gameType.service';
import { GameTypeEntity } from './entity/gameType/gameType.entity';
import { ApiUserDataService } from './entity/apiUserData/apiUserData.service';
import { ApiUserDataEntity } from './entity/apiUserData/apiUserData.entity';
import { AwardEntity } from './entity/award/award.entity';
import { PongGameEntity } from './entity/pongGame/pongGame.entity';
import { RelationEntity } from './entity/relation/relation.entity';
import { ChatterEntity } from './entity/chatter/chatter.entity';
import { AuthService } from './auth/auth.service';

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
      entities: [WebAppUser, StatEntity],
      autoLoadEntities: true,
      synchronize: true
    }),
    ChatModule,
    webAppUserModule,
    StatModule,
    TypeOrmModule.forFeature([WebAppUser, 
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
    ]),
  ],
  controllers: [AppController, CallbackController, DoubleAuthController, AuthController],
  providers: [AppService,webAppUserService, StatService, AuthService],
})
export class AppModule {}
