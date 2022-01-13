import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { if_chat } from '../interfaces/if-chat';
import { if_conversation } from '../interfaces/if_conversation';
import { if_emission } from '../interfaces/if_emmission';
import { GlobalService } from './sf-global.service';
import axios from 'axios';
import { Router } from '@angular/router';
import { if_message } from '../interfaces/if-message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chat?: if_chat;

  constructor(private global: GlobalService, private socket: Socket, private router: Router) {}

  clearMessages(convMessages: Array<if_message>, blockedList: Array<string>) {
    let i = -1;
    while (++i < blockedList.length) {
      let j = -1;
      while (++j < convMessages.length) {
        if (convMessages[j].login === blockedList[i]) {
          convMessages.splice(j, 1);
          j--;
        }
      }
    }

    return (convMessages);
  }

  conversationExists(
    value: string,
    listConv: Array<if_conversation>
  ): if_conversation | undefined {
    let theConv: if_conversation | undefined = undefined;
    for (const conv of listConv) {
      if (
        conv.members.length === 2 &&
        conv.members.find((val) => val === value)
      )
        theConv = conv;
    }
    return theConv;
  }

  createPrivateRoomName(pseudo1: string, pseudo2: string) {
    if (!pseudo1 || !pseudo2) return null;
    if (pseudo1.localeCompare(pseudo2) <= 0) return `${pseudo1}-${pseudo2}`;
    else return `${pseudo2}-${pseudo1}`;
  }

  getConvFromId(
    value: number,
    listConv: Array<if_conversation>,
    currentConv: if_conversation
  ): if_conversation {
    const conv = listConv.find((conv) => conv.conv_id === value);
    if (conv === undefined) return currentConv;
    else return conv;
  }

  prepareEmission(currentConv: if_conversation, conv_id: number) {
    const emission: if_emission = {
      data: {
        id: this.global.socketId,
        conv_id: conv_id,
        login: this.global.login as string,
        date: new Date(),
        content: currentConv.name,
        host: window.location.host + ":3000",
      },
      login: this.global.login as string,
      socketId: this.global.socketId as string,
    };
    return emission;
  }

  emission(
    type: string,
    currentConv: if_conversation,
    conv_id: number,
    data: any = undefined
  ) {
    let emission: if_emission;
    if (data === undefined)
      emission = this.prepareEmission(currentConv, conv_id);
    else
      emission = {
        data: data,
        login: this.global.login as string,
        socketId: this.global.socketId as string,
      };
    this.socket.emit(type, emission);
    return emission;
  }

  clearInputValues(str: string) {
    (<HTMLInputElement>document.getElementById(str)).value = '';
  }

  checkFormat(str: string, users: Array<string>, roomName: string) {
    if (!/^[a-zA-Z,/-]+$/.test(str)) {
      alert('The entered information cannot be processed');
      return false;
    } else if(roomName === '') 
      return (false);
    else {
      const members = str.split(',');
      for (const member of members) {
        if (!users.find((user) => user === member)) {
          alert('The entered member cannot be found');
          return false;
        }
      }
    }
    return true;
  }

  setResponse(
    status: string,
    roomName: string,
    members: Array<string>,
    password: string
  ) {
    return {
      status: status,
      data: {
        roomName: roomName,
        members: members,
        password: password,
      },
    };
  }

  async takeAndCheck(users: Array<string>) {
    const roomName = (<HTMLInputElement>document.getElementById('room-name'))
      .value;
    const members = [...new Set((<HTMLInputElement>(
      document.getElementById('members')
    )).value.split(','))];
    const password = (<HTMLInputElement>document.getElementById('password'))
      .value;
    const memberString = (<HTMLInputElement>document.getElementById('members'))
      .value;
    this.clearInputValues('room-name');
    this.clearInputValues('members');
    this.clearInputValues('password');
    if (!this.checkFormat(memberString, users, roomName))
      return this.setResponse('ko', roomName, members, password);
    document.getElementById('creationRoomForm')?.classList.add('hidden');
    const response = (
      await axios.post(`http://${window.location.host}:3000/cb-chat/check`, {
        data: roomName,
      })
    ).data;
    if (response === 'ok')
      return this.setResponse('ok', roomName, members, password);
    else {
      alert('This room name is already used');
      return this.setResponse('ko', roomName, members, password);
    }
  }

  loginEqSelectedUsrANDmembersEqLogin(
    listConv: Array<if_conversation>,
    selectedUser: string
  ) {
    const tmp: if_conversation | undefined = listConv.find(
      (conv: if_conversation) =>
        conv.members[0] === conv.members[1] &&
        conv.members[0] === selectedUser &&
        conv.type === 'private'
    );

    if (selectedUser === this.global.login && tmp) return tmp;
    else return undefined;
  }

  loginDifSelectedUsrANDuserFound(
    listConv: Array<if_conversation>,
    selectedUser: string
  ) {
    const tmp: if_conversation | undefined = listConv.find(
      (conv) =>
        conv.members.find((member) => member === selectedUser) &&
        conv.type === 'private'
    );

    if (selectedUser != this.global.login && tmp) return tmp;
    else return undefined;
  }

  createPrivateRoom(selectedUser: string) {
    const data = {
      id: 0,
      avatar: '../../../assets/room-pictures/private.png',
      type: 'private',
      name: this.createPrivateRoomName(
        this.global.login as string,
        selectedUser
      ),
      password: '',
      members: new Array<string>(selectedUser, this.global.login as string),
    };
    return data;
  }

  // invitToPlay(emission: if_emission, currentConv: if_conversation) {
  //   emission.data = {
  //     conv_id: currentConv.conv_id,
  //     logins_conv: currentConv.members,
  //     date: new Date(),
  //     content: "Invitation to start party!",
  //     invitation: true
  //   };
  //   emission.socketId = this.global.socketId as string;
  //   if (currentConv.name) {
  //     // this.socket.emit('message', this.emission);
  //     this.socket.emit('setInvitation', this.emission);
  //   }
  //   this.socket.on('launchgameInvitation', (game: any) => {
  //     this.router.navigate([`/pong/game/${game}`]);
  //   });
  // }

  // acceptToPlay(emission: if_emission, currentConv: if_conversation) {
  //   emission.data = {
  //     conv_id: currentConv.conv_id,
  //     logins_conv: currentConv.members,
  //     date: new Date(),
  //     content: "Invitation accepted!",
  //     invitation: false
  //   };
  //   // this.socket.emit('takeInvitation', this.emission);
  //   this.socket.emit('setInvitation', this.emission);
  //   this.socket.on('launchgameInvitation', (game: any) => {
  //     console.log(game);
  //     this.router.navigate([`/pong/game/${game}`]);
  //   });
  // }
  
  // cancelToPlay(emission: if_emission, currentConv: if_conversation) {
  //   emission.data = {
  //     conv_id: currentConv.conv_id,
  //     date: new Date(),
  //     content: "Invitation refused!",
  //     invitation: false
  //   };
  //   this.socket.emit('unsetInvitation', this.emission);
  //   console.log("PASS CANCEL");
  // }

}
