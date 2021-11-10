import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AchievementEntity } from "./achievement.entity";
import { AchievementService } from "./achievement.service";

@Module({
    imports: [TypeOrmModule.forFeature([AchievementEntity])],
    providers: [AchievementService],
  })
export class AchievementModule {}
  