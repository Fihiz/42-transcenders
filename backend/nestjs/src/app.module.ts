import { Module } from '@nestjs/common';
import { AppDatabaseModule } from './app-database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionModule } from './modules/mb-connection.module';
import { AuthModule } from './modules/mb-auth.module';
import { GameModule } from './modules/mb-game.module';
import { SocialModule } from './modules/mb-social.module';
import { StatsModule } from './modules/mb-stats.module';
import { UserModule } from './modules/mb-user.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
require('events').EventEmitter.prototype._maxListeners = 100;

@Module({
  imports: [AppDatabaseModule, GameModule, SocialModule, StatsModule, UserModule, AuthModule, ConnectionModule, EventEmitterModule.forRoot({
    maxListeners: 0,
    ignoreErrors: true,
    verboseMemoryLeak: true,
    removeListener: true,
    newListener: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
