import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from 'src/controllers/cb-auth.controller';
import { DoubleAuthController } from 'src/controllers/cb-double-auth.controller';
import { AchievementEntity } from 'src/entities/eb-achievement.entity';
import { ApiUserDataEntity } from 'src/entities/eb-api-user-data.entity';
import { AwardEntity } from 'src/entities/eb-award.entity';
import { StatEntity } from 'src/entities/eb-stat.entity';
import { WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';
import { AuthService } from 'src/services/sb-auth.service';
import { StatsService } from 'src/services/sb-stats.service';
import { UserService } from 'src/services/sb-user.service';
import { UserModule } from './mb-user.module';

@Module({
    imports: [UserModule, TypeOrmModule.forFeature([WebAppUserEntity, ApiUserDataEntity, StatEntity, AwardEntity, AchievementEntity])],
    providers: [AuthService, UserService, StatsService],
    controllers: [AuthController, DoubleAuthController],
})
export class AuthModule {}
