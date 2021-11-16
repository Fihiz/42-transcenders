import { Module } from '@nestjs/common';
import { Data } from 'src/app.service';
import { ConnectionGateway } from './connection.gateway';

@Module({
  providers: [ConnectionGateway, Data]
})
export class ConnectionModule {}