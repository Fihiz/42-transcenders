import { Module } from '@nestjs/common';
import { ConnectedGateway } from '../gateways/connected.gateway'

@Module({
  providers: [ConnectedGateway]
})
export class ConnectionModule {}