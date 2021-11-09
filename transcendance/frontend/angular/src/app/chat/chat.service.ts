import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // constructor(private socket: Socket) { }

  // sendMessage(message: Message) {
  //   this.socket.to(message.room).emit('message', message);
  //   console.log('message sended');
  // }

  // getMessage() {
  //   console.log(this.socket.fromEvent('message'));
  //   return this.socket.fromEvent('message');
  // }
}
