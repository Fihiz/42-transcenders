import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementEntity } from './entities/eb-achievement.entity';
import { ApiUserDataEntity } from './entities/eb-api-user-data.entity';
import { AwardEntity } from './entities/eb-award.entity';
import { ChatterEntity } from './entities/eb-chatter.entity';
import { ConversationEntity } from './entities/eb-conversation.entity';
import { GameTypeEntity } from './entities/eb-game-type.entity';
import { InvitationEntity } from './entities/eb-invitation.entity';
import { MessageEntity } from './entities/eb-message.entity';
import { ParticipantEntity } from './entities/eb-participant.entity';
import { PongGameEntity } from './entities/eb-pong-game.entity';
import { RelationEntity } from './entities/eb-relation.entity';
import { StatEntity } from './entities/eb-stat.entity';
import { WebAppUserEntity } from './entities/eb-web-app-user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'db_pong',
      entities: [
        AchievementEntity,
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
        WebAppUserEntity,
      ],
      synchronize: true,
    }),
  ],
  exports: [AppDatabaseModule],
  controllers: [],
  providers: []
})
export class AppDatabaseModule {}