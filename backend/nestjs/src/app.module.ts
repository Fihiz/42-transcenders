import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserService } from './user/user.service';

@Module({
  imports: [DatabaseModule],
  exports: [],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
