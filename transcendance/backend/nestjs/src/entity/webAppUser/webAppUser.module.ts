import { Module } from '@nestjs/common';
import { webAppUserService } from './webAppUser.service';
import { WebAppUser } from './webAppUser.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([WebAppUser])],
  providers: [webAppUserService],
})
export class webAppUserModule {}
