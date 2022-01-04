import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { if_message } from 'src/app/interfaces/if-message';
import { if_conversation } from 'src/app/interfaces/if_conversation';
import { if_emission } from 'src/app/interfaces/if_emmission';
import { ChatService } from 'src/app/services/sf-chat.service';
import { GlobalService } from 'src/app/services/sf-global.service';
import axios from "axios";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
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
    data: {},
  };
  login: string = '';

  constructor(
    private socket: Socket,
    private global: GlobalService,
    private chatService: ChatService
  ) {}


  onSendMessage() {
    const content = (<HTMLInputElement>document.getElementById('input-message'))
      .value;
    this.chatService.clearInputValues('input-message');
    console.log('sendMEssage');
    if (content.trim().length !== 0) {
      console.log('Prepare emission for emit');
      this.emission.data = {
        conv_id: this.currentConv.conv_id,
        date: new Date(),
        content: content,
      };
      this.emission.socketId = this.global.socketId as string;
      if (this.currentConv.name) this.socket.emit('message', this.emission);
      else alert('Error: No conv selected');
    } else console.log('Warning : cannot send an empty message');
  }

  keyUpEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSendMessage();
    }
  }

  onSelectOneToOneUserConv() {
    console.log('selectOneToOneUser');
    const selectedUser: string = (<HTMLInputElement>(
      document.getElementById('search-user')
    ))?.value;
    const LoginEqUsr = this.chatService.loginEqSelectedUsrANDmembersEqLogin(
      this.listConv,
      selectedUser
    );
    const LoginDifUsr = this.chatService.loginDifSelectedUsrANDuserFound(
      this.listConv,
      selectedUser
    );
    (<HTMLInputElement>document.getElementById('search-user')).value = '';
    if (LoginEqUsr) {
      console.log('conv found 0');
      this.currentConv = LoginEqUsr;
      this.emission = this.chatService.emission(
        'getMessages',
        this.currentConv,
        this.currentConv.conv_id
      );
    } else if (LoginDifUsr) {
      console.log('conv found 1');
      this.currentConv = LoginDifUsr;
      this.emission = this.chatService.emission(
        'getMessages',
        this.currentConv,
        this.currentConv.conv_id
      );
    } else {
      const data = this.chatService.createPrivateRoom(selectedUser);
      this.emission = this.chatService.emission(
        'newConversation',
        this.currentConv,
        0,
        data
      );
    }
  }

  async onCreateRoom() {
    console.log('on create room');
    const res = await this.chatService.takeAndCheck(this.users);
    if (res.status != 'ok') {
      return;
    }
    const roomAvatarsArray : string[] = ['../../../assets/room-pictures/1.png', '../../../assets/room-pictures/2.png', '../../../assets/room-pictures/3.png', '../../../assets/room-pictures/4.png', '../../../assets/room-pictures/5.png', '../../../assets/room-pictures/6.png', '../../../assets/room-pictures/7.png', '../../../assets/room-pictures/8.png', '../../../assets/room-pictures/9.png'];
    const newConv: if_conversation = {
      avatar: roomAvatarsArray[Math.floor(Math.random() * roomAvatarsArray.length)],
      conv_id: 0,
      name: res.data.roomName,
      password: btoa(res.data.password),
      type: res.data.password.length === 0 ? 'public' : 'protected',
      members: res.data.members,
    };
    if (!newConv.members.find(tmp => tmp === this.global.login))
      newConv.members.push(this.global.login as string);
    this.emission = this.chatService.emission(
      'newConversation',
      this.currentConv,
      0,
      newConv
    );
  }

  onSelectConv(value: any) {
    this.convMessages = [];
    console.log('SelectRoom');
    this.currentConv = this.chatService.getConvFromId(
      value,
      this.listConv,
      this.currentConv
    );
    this.emission = this.chatService.emission(
      'getMessages',
      this.currentConv,
      value
    );
  }

  onJoinRoom() {
    const roomName = (<HTMLInputElement>(
      document.getElementById('room-name-join')
    ))?.value;
    const roomPassword = (<HTMLInputElement>(
      document.getElementById('room-password-join')
    ))?.value;
    this.chatService.clearInputValues('room-name-join');
    this.chatService.clearInputValues('room-password-join');
    this.emission = this.chatService.emission('joinRoom', this.currentConv, 0, {
      roomName: roomName,
      roomPassword: btoa(roomPassword),
    });
  }

  onActivateAddfriend() {
    document.getElementById('add-user-form')?.classList.remove('hidden');
  }

  onAddFriend() {
    const name = (<HTMLInputElement>document.getElementById('add-friend')).value;
    this.chatService.clearInputValues('add-friend');
    if (name) {
      document.getElementById('add-user-form')?.classList.add('hidden');
      this.emission = this.chatService.emission(
        'addFriend',
        this.currentConv,
        this.currentConv.conv_id,
        {
          name: name,
          conv_id: this.currentConv.conv_id,
          roomName: this.currentConv.name,
        }
      );
    }
  }

  async onMute() {
    const value = (<HTMLInputElement>document.getElementById('mute-room'))?.value;
    this.chatService.clearInputValues('mute-room');
    if (value) {
      console.log('value = ', value)
      const isMute = await axios.get("http://127.0.0.1:3000/cb-chat/Mute", {params: {mutedOne: value, requester: this.login, conv_id: this.currentConv.conv_id}});
      if (isMute.data !== 'ok')
        alert(isMute.data);
    }
  }

  async onDeMute() {
    const value = (<HTMLInputElement>document.getElementById('de-mute-room'))?.value;
    this.chatService.clearInputValues('de-mute-room');
    if (value) {
      console.log('value = ', value)
      const isDeMute = await axios.get("http://127.0.0.1:3000/cb-chat/DeMute", {params: {mutedOne: value, requester: this.login, conv_id: this.currentConv.conv_id}});
      if (isDeMute.data !== 'ok')
        alert(isDeMute.data);
    }
  }

  async onNewAdmin() {
    const value = (<HTMLInputElement>document.getElementById('add-new-admin'))?.value;
    this.chatService.clearInputValues('add-new-admin');
    if (value) {
      console.log('value = ', value)
      const isBan = await axios.get("http://127.0.0.1:3000/cb-chat/newAdmin", {params: {newAdmin: value, requester: this.login, conv_id: this.currentConv.conv_id}});
      if (isBan.data !== 'ok')
        alert(isBan.data);
    }
  }

  async onBan() {
    console.log('onBan');
    const value = (<HTMLInputElement>document.getElementById('ban-room'))?.value;
    this.chatService.clearInputValues('ban-room');
    if (value) {
      const isBan = await axios.get("http://127.0.0.1:3000/cb-chat/ban", {params: {banned: value, requester: this.login,  conv_id: this.currentConv.conv_id}});
      if (isBan.data !== 'ok')
        alert(isBan.data);
      else {
        this.chatService.emission('aUserIsBan', this.currentConv, 0, {
          conv_name: this.currentConv.name,
          conv_id: this.currentConv.conv_id,
          target: value
        });
      }
    }
  }


  onLeave() {
    if (this.currentConv.name != '') {
      this.emission = this.chatService.emission(
        'leaveRoom',
        this.currentConv,
        this.currentConv.conv_id
      );
      const index = this.listConv.indexOf(this.currentConv);
      console.log('index = ', index);
      this.listConv.splice(index, 1);
      this.currentConv = {
        avatar: '',
        conv_id: 0,
        members: new Array(),
        name: '',
        password: '',
        type: 'public',
      };
      this.convMessages = [];
    }
  }

  clearConv(){
    this.currentConv.avatar = '';
    this.currentConv.conv_id = 0;
    this.currentConv.members = [];
    this.currentConv.name = '';
    this.currentConv.password = '';
    this.currentConv.type = '';
    this.convMessages = [];
  }

  ngOnInit(): void {
    this.login = this.global.login as string;
    this.socket.on('users', (data: any) => {
      this.users = data;
    });
    this.socket.on('allMessages', (data: if_message[]) => {
      if (data.length > 0 && data[0].conv_id === this.currentConv.conv_id) {
        this.convMessages.splice(0, this.convMessages.length);
        this.convMessages = data;
      }
    });
    this.socket.on('allConversations', (data: any) => {
      console.log('datas = ', data);
      this.listConv = data as Array<if_conversation>;
    });
    this.socket.on('newConversation', (data: any) => {
      this.listConv.push(data);
    });
    this.socket.on('youAreBan', (data: any) => {
      if (this.currentConv.conv_id === data.conv_id)
        this.clearConv();
      const index = this.listConv.findIndex(conv => conv.conv_id === data.conv_id && conv.name === data.conv_name);
      if (index >= 0)
        this.listConv.splice(index, 1);
      //this.listConv(data);
    });
    this.socket.on('error', (data: any) => {
      alert(data);
    });
  }
}
