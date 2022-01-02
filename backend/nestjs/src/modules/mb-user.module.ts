import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from 'src/controllers/cb-user.controller';
import { ApiUserDataEntity } from 'src/entities/eb-api-user-data.entity';
import { WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';
import { UserService } from 'src/services/sb-user.service';

@Module({
    imports: [TypeOrmModule.forFeature([WebAppUserEntity, ApiUserDataEntity])],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
