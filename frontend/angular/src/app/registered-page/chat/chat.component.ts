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
  users: Array<string> = new Array();
  currentConv: if_conversation = {
    avatar: '',
    conv_id: 0,
    members: new Array(),
    name: '',
    password: '',
    type: 'public',
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


	clearInputValues (str: string) {
		(<HTMLInputElement>document.getElementById(str)).value="";
	}

  onSendMessage() {
	const content = (<HTMLInputElement>document.getElementById('input-message')).value;
	this.clearInputValues('input-message');
    console.log('sendMEssage')
    this.emission.data = {
      conv_id: this.currentConv.conv_id,
      date: new Date(),
      content: content
    }
    this.emission.socketId = this.global.socketId as string;
    this.socket.emit('message', this.emission);
  }

  keyUpEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
        this.onSendMessage();
    }
}

  onSelectOneToOneUserConv() {
		console.log('selectOneToOneUser');
    const selectedUser: string = (<HTMLInputElement>document.getElementById('search-user'))?.value;
    const LoginEqUsr = this.chatService.loginEqSelectedUsrANDmembersEqLogin(this.listConv, selectedUser);
    const LoginDifUsr = this.chatService.loginDifSelectedUsrANDuserFound(this.listConv, selectedUser);
    (<HTMLInputElement>document.getElementById('search-user')).value = '';
    if (LoginEqUsr) {
      console.log('conv found 0');
      this.currentConv = LoginEqUsr;
      this.emission = this.chatService.emission('getMessages', this.currentConv, this.currentConv.conv_id);
    }
    else if (LoginDifUsr) {
      console.log('conv found 1')
      this.currentConv = LoginDifUsr;
      this.emission = this.chatService.emission('getMessages', this.currentConv, this.currentConv.conv_id);
    }
    else {
      const data = this.chatService.createPrivateRoom(selectedUser);
      this.emission = this.chatService.emission('newConversation', this.currentConv, 0, data);
    }
	}

	onActivateRoomForm() {
		document.getElementById("creationRoomForm")?.classList.remove("hidden");
    document.getElementById('joinRoomForm')?.classList.add('hidden');
	}

  async onCreateRoom() {
    console.log("create room");
    const res = await this.chatService.takeAndCheck()
    if (res.status != 'ok')
      alert('error in room parameters');
    const newConv: if_conversation = {
      avatar: "",
      conv_id: 0,
      name: res.data.roomName,
      password: res.data.password,
      type: res.data.password.length === 0 ? 'public' : 'protected',
      members: res.data.members
    }
    this.emission = this.chatService.emission('newConversation', this.currentConv, 0, newConv);
  }

  onSelectConv(value: any) {
		console.log('SelectRoom');
		this.currentConv = this.chatService.getConvFromId(value, this.listConv, this.currentConv);
    this.emission = this.chatService.emission('getMessages', this.currentConv, value);
  }


	onActivateJoinRoomForm() {
		document.getElementById('joinRoomForm')?.classList.remove('hidden');
    document.getElementById('creationRoomForm')?.classList.add('hidden');
	}

	onJoinRoom() {
		document.getElementById('joinRoomForm')?.classList.add('hidden');
		const roomName = (<HTMLInputElement>document.getElementById('room-name-join'))?.value;
	const roomPassword = (<HTMLInputElement>document.getElementById('room-password-join'))?.value;
	this.clearInputValues('room-name-join');
	this.clearInputValues('room-password-join');
    this.emission = this.chatService.emission('joinRoom', this.currentConv, 0, {roomName: roomName, roomPassword: roomPassword});
	}

  ngOnInit(): void {
    this.socket.on('users', (data: any) => {
        this.users = data;
    });
    this.socket.on('allMessages', (data: if_message[]) => {
			this.convMessages.splice(0, this.convMessages.length);
			for (const mess of data) {
				this.convMessages.push(mess);
			}
    });
    this.socket.on('allConversations', (data: any) => {
      this.listConv = data as Array<if_conversation>;
    });
    this.socket.on('newConversation', (data: any) => {
      this.listConv.push(data);
      this.currentConv = data;
    });
    this.socket.on('error', (data: any) => {
      alert(data);
    })
  }
  
}
