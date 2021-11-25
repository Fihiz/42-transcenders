import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // introduce(socket: Socket, Res: any) {
  //   GlobalService.login = Res.data.login;
  //   GlobalService.connected = true;
  //   GlobalService.socketId = socket.ioSocket.id;
  //   const message: Message = {
  //       id: socket.ioSocket.id,
  //       login: Res.data.login,
  //       body: 'connection',
  //       to: ['nobody'],
  //       conv_id:0,
  //       date: new Date()
  //     }
  //     socket.emit('introduction', message);
  // }
}
