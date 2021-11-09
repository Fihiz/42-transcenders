import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, OnGatewayDisconnect, WebSocketServer, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Message } from './message.model';
import { Repository } from 'typeorm';


@WebSocketGateway({cors:{origin: 'http://127.0.0.1'}})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  messageData: Array<Message> = [];
  loginIdMap: Map<string, Array<string>> = new Map<string, Array<string>>();

  @WebSocketServer()
  server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: Message): void {
    this.messageData.push(message);
    if (message.to != null && this.loginIdMap.get(message.to) != undefined)
      this.server.to(this.loginIdMap.get(message.to)).to(message.id).emit('message', this.messageData);
    else {
      const errorMess: Message = {
        id: message.id as string,
        login: message.login as string,
        body: 'error in contact',
        to: 'sender'
      }
      this.messageData.pop();
      this.messageData.push(errorMess);
      this.server.to(errorMess.id).emit('message', this.messageData);
    }
    
  }

  @SubscribeMessage('introduction')
  handleIntroduce(@MessageBody() message: Message): void {
    if (this.loginIdMap.has(message.login))
      this.loginIdMap.get(message.login).push(message.id);
    else {
      this.loginIdMap.set(message.login, [message.id]);
    }
  }

  handleConnection() {
    this.server.emit('message', this.messageData);
    console.log('connected ')
  }

  handleDisconnect() {
    console.log('disconnected ')
  }
}
