import { Module } from '@nestjs/common';
import { AdminViewGateway } from 'src/gateways/admin-view.gateway';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { UserService } from 'src/services/sb-user.service';
import { WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';
import { ApiUserDataEntity } from 'src/entities/eb-api-user-data.entity';
import { RelationEntity } from 'src/entities/eb-relation.entity';


@Module({
    imports: [Repository, TypeOrmModule.forFeature([ RelationEntity, WebAppUserEntity, ApiUserDataEntity])],
    providers: [ UserService, AdminViewGateway],
    controllers: [],
})
export class AdminViewModule {}
