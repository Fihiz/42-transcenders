import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) { }

  sendMessage(message: Message | null | undefined) {
    if (message) {
      this.socket.emit('message', message);
      console.log('message sended');
    }
  }

  getMessage(): Observable<Array<string>> {
    console.log('message');
    return this.socket.fromEvent('message') as Observable<Array<string>>;
  }

  getDisconnection(): Observable<string> {
    console.log('disconnected (getDisconnection)');
    const event =  this.socket.fromEvent('disconnection') as Observable<string>;
    console.log(event)
    return(event)
  }

  getSocket(): Socket {
    return (this.socket);
  }
}
