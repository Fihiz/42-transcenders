import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private socket: Socket) {}

	getSocket(): Socket {
    return (this.socket);
  }
}