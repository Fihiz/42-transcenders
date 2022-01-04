import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameController } from 'src/controllers/cb-game.controller';
import { AchievementEntity } from 'src/entities/eb-achievement.entity';
import { AwardEntity } from 'src/entities/eb-award.entity';
import { GameTypeEntity } from 'src/entities/eb-game-type.entity';
import { ParticipantEntity } from 'src/entities/eb-participant.entity';
import { PongGameEntity } from 'src/entities/eb-pong-game.entity';
import { StatEntity } from 'src/entities/eb-stat.entity';
import { GameGateway } from 'src/gateways/game.gateway';
import { GameService } from 'src/services/sb-game.service';
import { StatsService } from 'src/services/sb-stats.service';

@Module({
    imports: [TypeOrmModule.forFeature([GameTypeEntity, ParticipantEntity, PongGameEntity, StatEntity, AwardEntity, AchievementEntity])],
    providers: [GameService, GameGateway, StatsService],
    controllers: [GameController],
})
export class GameModule {}
