import { Component, Input, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { GlobalService} from '../globales.service';
import { ChatService } from './chat.service';
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

  constructor(private message: Message,
     private chatService: ChatService) { 
    this.chatService.getMessage().subscribe(data => {
      if (typeof(data) === "object")
        this.messageTab = data as unknown as Array<Message>;
    });
  }

  onTest() {
    console.log(GlobalService.test);
    GlobalService.test = "test test 2";
    console.log(GlobalService.test);
  }

  onClick() {
    console.log(GlobalService.test)
    let message: Message = this.message;
    const inputTo = <HTMLInputElement>document.getElementById("inputTo");
    const inputBody = <HTMLInputElement>document.getElementById("inputBody");
    message.body = inputBody?.value;
    message.login = this.pseudo as string;
    message.to = inputTo?.value;
    message.id = this.socketId as string;
    inputBody.value = '';
    inputTo.value = '';
    this.chatService.sendMessage(message);
  }

  ngOnInit() {}
}
