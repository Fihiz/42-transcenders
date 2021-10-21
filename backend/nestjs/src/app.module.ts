import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CallbackController } from './callback/callback.controller';
import { DoubleAuthController } from './double-auth/double-auth.controller';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';

import "reflect-metadata";
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebAppUser } from './entity/webAppUser/webAppUser.entity';
import { webAppUserModule } from './entity/webAppUser/webAppUser.module';
import { StatModule } from './entity/Stat/stat.module';
import { StatEntity } from './entity/Stat/stat.entity';
import { webAppUserService } from './entity/webAppUser/webAppUser.service';
import { StatService } from './entity/Stat/stat.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database',
      username: "admin",
      password: "admin",
      database: "db_pong",
      entities: [WebAppUser, StatEntity],
      autoLoadEntities: true,
      synchronize: true
    }),
    ChatModule,
    webAppUserModule,
    StatModule,
    TypeOrmModule.forFeature([WebAppUser, StatEntity]),
  ],
  controllers: [AppController, CallbackController, DoubleAuthController, AuthController],
  providers: [AppService,webAppUserService, StatService],
})
export class AppModule {}
