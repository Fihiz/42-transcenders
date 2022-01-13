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
import { AdminViewModule } from './mb-admin-view.module';
import { RelationEntity } from 'src/entities/eb-relation.entity';
import { DisplayProfileUpdate } from 'src/gateways/displayProfileUpdate.gateway';

@Module({
    imports: [UserModule, TypeOrmModule.forFeature([RelationEntity, WebAppUserEntity, ApiUserDataEntity, StatEntity, AwardEntity, AchievementEntity]), AdminViewModule],
    providers: [AuthService, UserService, StatsService, DisplayProfileUpdate],
    controllers: [AuthController, DoubleAuthController],
})
export class AuthModule {}
