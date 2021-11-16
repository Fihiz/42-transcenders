import { Component, Input, OnInit } from '@angular/core';
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
      console.log('data = ', data);
      if (typeof(data) === "object")
        this.messageTab = data as unknown as Array<Message>;
    });
  }

  onClick() {
    let message: Message = this.message;
    const inputTo = <HTMLInputElement>document.getElementById("inputTo");
    const inputBody = <HTMLInputElement>document.getElementById("inputBody");
    message.body = inputBody?.value;
    message.login = GlobalService.login;
    message.to = inputTo?.value;
    message.id = GlobalService.socketId;
    inputBody.value = '';
    inputTo.value = '';
    this.chatService.sendMessage(message);
  }

  ngOnInit() {}
}
