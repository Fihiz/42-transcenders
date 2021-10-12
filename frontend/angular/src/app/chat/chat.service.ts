import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) { }

  sendMessage() {
    console.log('message sended');
  }

  getMessage() {
    return this.socket.fromEvent('message');
  }
}
