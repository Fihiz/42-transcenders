import { Module } from '@nestjs/common';
import { AppDatabaseModule } from './app-database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionModule } from './modules/mb-connection.module';
import { AuthModule } from './modules/mb-auth.module';
import { ChatModule } from './modules/mb-chat.module';
import { GameModule } from './modules/mb-game.module';
import { SocialModule } from './modules/mb-social.module';
import { StatsModule } from './modules/mb-stats.module';
import { UserModule } from './modules/mb-user.module';
import { UserService } from './services/sb-user.service';
import { ChatService } from './services/sb-chat.service';
import { AuthService } from './services/sb-auth.service';

@Module({
  imports: [AppDatabaseModule, ChatModule, GameModule, SocialModule, StatsModule, UserModule, AuthModule, ConnectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
