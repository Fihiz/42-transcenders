import { createOptional } from '@angular/compiler/src/core';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService} from '../globales.service';
import { ChatService } from './chat.service';
import { Message } from './message.model';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})


export class ChatComponent implements OnInit, OnDestroy{

  pseudo: string | null = null;
  messageTab: Array<Message> = [];
  socketId: string | null = null;
  subscription: Subscription
  static room_id: number = 0;

  constructor(private message: Message,
              private chatService: ChatService) { 
  this.subscription = this.chatService.getMessage().subscribe(data => {
      console.log('data = ', data);
      if (typeof(data) === "object")
        this.messageTab = data as unknown as Array<Message>;
    });
    this.subscription = this.chatService.getErrorMessage().subscribe(data => {
      console.log('data = ', data);
      if (typeof(data) === "object")
        this.messageTab = data as unknown as Array<Message>;
    });
  }

  onClick() {
    let message: Message = this.message;
    let isFind: boolean = false;
    const inputTo = <HTMLInputElement>document.getElementById("inputTo");
    const inputBody = <HTMLInputElement>document.getElementById("inputBody");
    message.body = inputBody?.value;
    message.login = GlobalService.login as string;
    message.to = inputTo?.value.split(',');
    message.id = GlobalService.socketId;
    message.date = new Date();
    this.chatService.room.forEach(room => {
        if (isFind === false && 
            room.chatter.length === 2 && 
            message.to.length === 1 && 
            !room.chatter.find(element => element === message.to[0])) {
          isFind = true;
          ChatComponent.room_id = ChatComponent.room_id + 1;
          message.conv_id = ChatComponent.room_id;
          this.chatService.room.add({chatter: [message.login, message.to[0]], room_id: ChatComponent.room_id, room_name: null});
        }
        else if (isFind === false && 
                room.chatter.length === 2 && 
                message.to.length === 1 && 
                room.chatter.find(element => element === message.to[0])) {
          isFind = true;
          message.conv_id = room.room_id;
        }
    });
    if (this.chatService.room.size === 0) {
      ChatComponent.room_id = ChatComponent.room_id + 1;
      message.conv_id = ChatComponent.room_id;
      this.chatService.room.add({chatter: [message.login, message.to[0]], room_id: ChatComponent.room_id, room_name: null});
    }
    inputBody.value = '';
    inputTo.value = '';
    console.log(message)
    this.chatService.sendMessage(message);
  }

  ngOnDestroy(){this.subscription.unsubscribe();}

  ngOnInit() {}
}
