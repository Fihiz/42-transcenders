import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiUserDataEntity } from './entities/apiUserData/apiUserData.entity';
import { WebAppUserEntity } from './entities/webAppUser/webAppUser.entity';
import { AchievementEntity } from './entities/achievement/achievement.entity';
import { AwardEntity } from './entities/award/award.entity';
import { ChatterEntity } from './entities/chatter/chatter.entity';
import { ConversationEntity } from './entities/conversation/conversation.entity';
import { GameTypeEntity } from './entities/gameType/gameType.entity';
import { InvitationEntity } from './entities/invitation/invitation.entity';
import { MessageEntity } from './entities/message/message.entity';
import { ParticipantEntity } from './entities/participant/participant.entity';
import { PongGameEntity } from './entities/pongGame/pongGame.entity';
import { RelationEntity } from './entities/relation/relation.entity';
import { StatEntity } from './entities/stat/stat.entity';

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
  exports: [DatabaseModule],
  controllers: [],
  providers: []
})
export class DatabaseModule {}