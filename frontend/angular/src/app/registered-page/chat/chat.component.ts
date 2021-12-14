import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { if_message } from 'src/app/interfaces/if-message';
import { if_conversation } from 'src/app/interfaces/if_conversation';
import { if_emission } from 'src/app/interfaces/if_emmission';
import { ChatService } from 'src/app/services/sf-chat.service';
import { GlobalService } from 'src/app/services/sf-global.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  convMessages: Array<if_message> = [];
  usersOnLine: Set<string> = new Set();
  currentConv: number = 0;
  listConv: Array<if_conversation> = [];
  emission: if_emission = {
    login: this.global.login as string,
    socketId: this.global.socketId as string,
    data: {}
  }


  constructor(private socket: Socket,
              private global: GlobalService,
							private chatService : ChatService) { }


  onSendMessage() {
    const content = "content message test";
    // recuperer le message
    console.log('sendMEssage')
    this.emission.data = {
      conv_id: this.currentConv,
      date: new Date(),
      body: content,
    }
    this.socket.emit('message', this.emission);
  }

  onSelectUser(value: string) {
		const doesConvExists: if_conversation |  undefined = this.chatService.conversationExists(value, this.listConv);
		if (doesConvExists)
		{
			this.currentConv = doesConvExists.id
			const message: if_message = {
				id: this.global.socketId,
				avatar: '',
				conv_id: this.currentConv,
				login: this.global.login as string,
				date: new Date(),
				body: this.currentConv.toString(),
				to: []
			}
			this.emission.data = message;
			this.socket.emit('getMessages', this.emission);
		}
	}

  onCreateRoom() {
    console.log("create room");
    // recuperer les valeurs pour creer la conversation
    const newConv: if_conversation = {
      avatar: "",
      created: new Date(),
      id: 0,
      name: 'room1',
      password: '',
      type: "public",
      updated: new Date(),
      members: new Set<string>()
    }
    this.emission.data = newConv;
    this.socket.emit('newConversation', this.emission);
  }

  onSelectConv(value: any) {
    console.log("value = ", value)
    this.currentConv = value;
    const message: if_message = {
      id: this.global.socketId,
      avatar: '',
      conv_id: value,
      login: this.global.login as string,
      date: new Date(),
      body: this.currentConv.toString(),
      to: []
    }
    this.emission.data = message;
    this.socket.emit('getMessages', this.emission);
  }

  ngOnInit(): void {
    this.socket.on('usersOnLine', (data: any) => {
        this.usersOnLine = data;
    });
    this.socket.on('allMessages', (data: any) => {
      console.log("data = ", data)
      if (this.currentConv == data.conv_id) {
        this.convMessages = data.body;
      }
    });
    this.socket.on('allConversations', (data: any) => {
      this.listConv = data as Array<if_conversation>;
    });
    this.socket.on('newConversation', (data: any) => {
      this.listConv.push(data);
    });
  }
  
}
