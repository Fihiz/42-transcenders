import { Module } from '@nestjs/common';
import { AppDatabaseModule } from './app-database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/mb-auth.module';
import { ChatModule } from './modules/mb-chat.module';
import { GameModule } from './modules/mb-game.module';
import { SocialModule } from './modules/mb-social.module';
import { StatsModule } from './modules/mb-stats.module';
import { UserModule } from './modules/mb-user.module';

@Module({
  imports: [AppDatabaseModule, ChatModule, GameModule, SocialModule, StatsModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
