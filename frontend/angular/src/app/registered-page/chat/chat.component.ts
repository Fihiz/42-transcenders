import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { if_message } from 'src/app/interfaces/if-message';
import { convType, if_conversation } from 'src/app/interfaces/if_conversation';
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
  users: Array<string> = new Array();
  currentConv: if_conversation = {
    avatar: '',
    id: 0,
    members: new Set(),
    name: '',
    password: '',
    type: convType.public,
  };
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
    this.emission.socketId = this.global.socketId as string;
    this.socket.emit('message', this.emission);
  }

  onSelectOneToOneUserConv() {
    const userPseudo: string = (<HTMLInputElement>document.getElementById('search-user'))?.value;
    console.log('value = ', userPseudo);
    console.log('this.users = ', this.users);
    if (this.users.find(pseudo => pseudo === userPseudo)) {
      console.log('test')
      let tmp;
      if (tmp = this.listConv.find(conv => conv.members.size == 2 && conv.members.has(userPseudo)) as if_conversation)
        this.currentConv = tmp;
      else {
        // this.socket.emit('newConversation', {
        //   id: 0,
        //   avatar: '',
        //   type: 'private',
        //   name: userPseudo,
        //   password: ,
        //   members: 
        // })
      }
      console.log('current_conv = ', this.currentConv)
    }
	}

  onCreateRoom() {
    console.log("create room");
    // recuperer les valeurs pour creer la conversation
    const newConv: if_conversation = {
      avatar: "",
      id: 0,
      name: 'room1',
      password: '',
      type: convType.public,
      members: new Set<string>()
    }
    this.emission.data = newConv;
    this.emission.socketId = this.global.socketId as string,
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
    this.emission.socketId = this.global.socketId as string,
    this.socket.emit('getMessages', this.emission);
  }




  ngOnInit(): void {
    this.socket.on('users', (data: any) => {
      console.log('users = ', data)
        this.users = data;
    });
    this.socket.on('allMessages', (data: any) => {
      console.log("data = ", data)
      if (this.currentConv == data.conv_id) {
        this.convMessages = data.body;
      }
    });
    this.socket.on('allConversations', (data: any) => {
      console.log('allConversations = ', data);
      this.listConv = data as Array<if_conversation>;
    });
    this.socket.on('newConversation', (data: any) => {
      this.listConv.push(data);
    });
    this.socket.on('error', (data: any) => {
      alert(data);
    })
  }
  
}
