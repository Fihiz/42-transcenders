import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Message } from './message.model';

class roomProperty {
  room_id: number = 0;
  chatter: Array<string> = [];
  room_name: string |  null = 'room_name';
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  room: Set<roomProperty>;
  constructor(private socket: Socket) {
    this.room = new Set<roomProperty>();
  }

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

  getErrorMessage(): Observable<Array<string>> {
    console.log('message');
    return this.socket.fromEvent('errorMessage') as Observable<Array<string>>;
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
