import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { WebAppUserModule } from './database/entities/webAppUser/webAppUser.module';

@Module({
  imports: [DatabaseModule, WebAppUserModule],
  exports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
