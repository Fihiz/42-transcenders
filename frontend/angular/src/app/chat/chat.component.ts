import { Component, Input, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Message } from './message.model';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})


export class ChatComponent implements OnInit{

  pseudo: string | null = null;
  messageTab: Array<Message> = [];
  socketId: string | null = null;

  constructor(private message: Message, private socket: Socket) { 
    this.getMessage().subscribe(data => {
      if (typeof(data) === "object")
        this.messageTab = data as unknown as Array<Message>;
    });
  }

  onClick() {
    let message: Message = this.message;
    const inputTo = <HTMLInputElement>document.getElementById("inputTo");
    const inputBody = <HTMLInputElement>document.getElementById("inputBody");
    message.body = inputBody?.value;
    message.login = this.pseudo as string;
    message.to = inputTo?.value;
    message.id = this.socketId as string;
    inputBody.value = '';
    inputTo.value = '';
    this.sendMessage(message);
  }

  sendMessage(message: Message | null | undefined) {
    if (message) {
      this.socket.emit('message', message);
      console.log('message sended');
    }
  }

  getMessage(): Observable<Array<string>> {
    return this.socket.fromEvent('message') as Observable<Array<string>>;
  }
  
  ngOnInit() {
    this.socket.on('connect', () => {
      this.socketId = this.socket.ioSocket.id;
    });
    while (this.pseudo === null)
      this.pseudo = window.prompt("login please");
    if (this.pseudo === '') 
    {
      console.log('disconnected');
      this.socket.disconnect();
    }
    else {
      const message: Message = {
        id: this.socketId as string,
        login: this.pseudo as string,
        body: 'connection',
        to: 'nobody'
      }
      this.socket.emit('introduction', message);
    }
  }
}
