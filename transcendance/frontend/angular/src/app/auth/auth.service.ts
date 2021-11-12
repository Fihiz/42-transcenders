
import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Message } from "../chat/message.model";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    introduce(socket: Socket, Res: any) {
      const message: Message = {
          id: socket.ioSocket.id,
          login: Res.data.login,
          body: 'connection',
          to: 'nobody'
        }
        socket.emit('introduction', message);
    }
}