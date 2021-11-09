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
import { ApiUserDataEntity } from './entity/apiUserData/apiUserData.entity';
import { ApiUserDataModule } from './entity/apiUserData/apiUserData.module';
import { WebAppUserEntity } from './entity/webAppUser/webAppUser.entity';
import { WebAppUserModule } from './entity/webAppUser/webAppUser.module';
import { StatEntity } from './entity/stat/stat.entity';
import { StatModule } from './entity/stat/stat.module';
import { MessagesEntity } from './entity/messages/messages.entity';
import { MessagesModule } from './entity/messages/messages.module';
import { ConversationEntity } from './entity/conversation/conversation.entity';
import { ConversationModule } from './entity/conversation/conversation.module';
import { AchievementEntity } from './entity/achievement/achievement.entity';
import { AchievementModule } from './entity/achievement/achievement.module';
import { GameTypeEntity } from './entity/gameType/gameType.entity';
import { GameTypeModule } from './entity/gameType/gameType.module';
import { AwardEntity } from './entity/award/award.entity';
import { AwardModule } from './entity/award/award.module';
import { PongGameEntity } from './entity/pongGame/pongGame.entity';
import { PongGameModule } from './entity/pongGame/pongGame.module';
import { RelationEntity } from './entity/relation/relation.entity';
import { RelationModule } from './entity/relation/relation.module';
import { ChatterEntity } from './entity/chatter/chatter.entity';
import { ChatterModule } from './entity/chatter/chatter.module';
import { ParticipantModule } from './entity/participant/participant.module';
import { ParticipantEntity } from './entity/participant/participant.entity';
import { InvitationModule } from './entity/invitation/invitation.module';
import { InvitationEntity } from './entity/invitation/invitation.entity';

@Module({
  imports: [WebAppUserModule, 
    StatModule, 
    MessagesModule, 
    ConversationModule, 
    AchievementModule,
    GameTypeModule,
    ApiUserDataModule, 
    AwardModule,
    PongGameModule,
    RelationModule,
    ChatterModule,
    ParticipantModule,
    InvitationModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database',
      username: "admin",
      password: "admin",
      database: "db_pong",
      entities: [WebAppUserEntity, 
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
      ],
      autoLoadEntities: true,
      synchronize: true
    }),
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
  controllers: [AppController, CallbackController, DoubleAuthController, AuthController],
  providers: [AppService],
})
export class AppModule {}
