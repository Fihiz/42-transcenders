import { Module } from '@nestjs/common';
import { WebAppUserService } from './webAppUser.service';
import { WebAppUserEntity } from './webAppUser.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([WebAppUserEntity])],
  providers: [WebAppUserService],
})
export class WebAppUserModule {}
