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
    return this.socket.fromEvent('message') as Observable<Array<string>>;
  }

  getDisconnection(): void {
    console.log('you have been disconnected');
    this.socket.disconnect();
  }
}
