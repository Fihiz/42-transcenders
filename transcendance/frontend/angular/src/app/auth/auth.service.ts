
import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Message } from "../chat/message.model";
import { GlobalService } from "../globales.service";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    introduce(socket: Socket, Res: any) {
      GlobalService.login = Res.data.login;
      GlobalService.connected = true;
      GlobalService.socketId = socket.ioSocket.id;
      const message: Message = {
          id: socket.ioSocket.id,
          login: Res.data.login,
          body: 'connection',
          to: 'nobody'
        }
        socket.emit('introduction', message);
    }
}