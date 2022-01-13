import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { StatsController } from 'src/controllers/cb-stats.controller';
import { AchievementEntity } from 'src/entities/eb-achievement.entity';
import { AwardEntity } from 'src/entities/eb-award.entity';
import { StatEntity } from 'src/entities/eb-stat.entity';
import { DisplayProfileUpdate } from 'src/gateways/displayProfileUpdate.gateway';
import { StatsService } from 'src/services/sb-stats.service';

@Module({
    imports: [TypeOrmModule.forFeature([StatEntity, AwardEntity, AchievementEntity])],
    providers: [StatsService, DisplayProfileUpdate],
    controllers: [StatsController],
})
export class StatsModule {}
