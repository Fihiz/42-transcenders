import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from 'src/controllers/cb-auth.controller';
import { DoubleAuthController } from 'src/controllers/cb-double-auth.controller';
import { ApiUserDataEntity } from 'src/entities/eb-api-user-data.entity';
import { WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';
import { AuthService } from 'src/services/sb-auth.service';
import { UserService } from 'src/services/sb-user.service';
import { UserModule } from './mb-user.module';

@Module({
    imports: [UserModule, TypeOrmModule.forFeature([WebAppUserEntity, ApiUserDataEntity])],
    providers: [AuthService, UserService],
    controllers: [AuthController, DoubleAuthController],
})
export class AuthModule {}
