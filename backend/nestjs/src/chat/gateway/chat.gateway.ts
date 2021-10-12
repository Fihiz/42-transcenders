import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, OnGatewayDisconnect, WebSocketServer, MessageBody } from '@nestjs/websockets';

@WebSocketGateway({cors:{origin: 'http://127.0.0.1'}})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message): void {
    this.server.emit('message', message);
  }

  handleConnection() {
    this.server.emit('message', 'connected');
    console.log('connected ')
  }

  handleDisconnect() {
    this.server.emit('message', 'disconnected');
    console.log('disconnected ')
  }
}
