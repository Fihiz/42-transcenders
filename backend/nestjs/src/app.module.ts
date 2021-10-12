import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CallbackController } from './callback/callback.controller';
import { DoubleAuthController } from './double-auth/double-auth.controller';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ChatModule,
  ],
  controllers: [AppController, CallbackController, DoubleAuthController, AuthController],
  providers: [AppService],
})
export class AppModule {}
