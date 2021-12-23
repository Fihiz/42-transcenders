import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { if_chat } from '../interfaces/if-chat';
import { if_conversation } from '../interfaces/if_conversation';
import { if_emission } from '../interfaces/if_emmission';
import { GlobalService } from './sf-global.service';
import axios from 'axios';


@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chat?: if_chat;


  constructor(private global: GlobalService,
              private socket: Socket) {}	
	
	conversationExists(value: string , listConv: Array<if_conversation>): if_conversation | undefined {
		let theConv: if_conversation | undefined = undefined
		for (const conv of listConv) {
			if (conv.members.length === 2 && conv.members.find(val => val === value))
			theConv = conv;
		}
		return (theConv)
	}

  createPrivateRoomName(pseudo1:string, pseudo2:string) {
    if (!pseudo1 || !pseudo2)
      return (null);
    if (pseudo1.localeCompare(pseudo2) <= 0)
      return (`${pseudo1}-${pseudo2}`);
    else
      return (`${pseudo2}-${pseudo1}`);
  }

	getConvFromId(value: number, listConv: Array<if_conversation>, currentConv: if_conversation): if_conversation {
		const conv = listConv.find(conv => conv.conv_id === value);
		if (conv === undefined)
			return (currentConv);
		else
			return (conv);
	}

  prepareEmission(currentConv: if_conversation, conv_id: number) {
    const emission: if_emission = {
      data: {
      id: this.global.socketId,
      conv_id: conv_id,
      login: this.global.login as string,
      date: new Date(),
      content: currentConv.toString(),
      },
      login: this.global.login as string,
      socketId : this.global.socketId as string,
      }
      return(emission);
  }

  emission(type: string, currentConv:if_conversation, conv_id: number, data: any = undefined) {
    let emission: if_emission 
    if (data === undefined)
      emission = this.prepareEmission(currentConv, conv_id);
    else
      emission = {
        data: data,
        login: this.global.login as string,
        socketId: this.global.socketId as string
      }
    this.socket.emit(type, emission)
    return (emission);
  }

  clearInputValues (str: string) {
	(<HTMLInputElement>document.getElementById(str)).value="";
  }

  async takeAndCheck() {
    const roomName = (<HTMLInputElement>document.getElementById("room-name")).value;
    const members = (<HTMLInputElement>document.getElementById("members")).value.split(', ');
    const password = (<HTMLInputElement>document.getElementById("password")).value;
	document.getElementById('creationRoomForm')?.classList.add('hidden');
	// clear values in inputs
	this.clearInputValues("room-name");
	this.clearInputValues("members");
	this.clearInputValues("password");

    const response = (await axios.post("http://127.0.0.1:3000/cb-chat/check", {data: roomName,})).data;
    if (response === 'ok') {
      return ({
        status:'ok',
        data: {
          roomName: roomName,
          members: members,
          password: password
        }
      });
    }
    else
    return ({
      status:'ko',
      data: {
        roomName: roomName,
        members: members,
        password: password
      }
    });
  }

  loginEqSelectedUsrANDmembersEqLogin(listConv: Array<if_conversation>, selectedUser: string) {
    const tmp: if_conversation | undefined = listConv.find((conv: if_conversation) => 
      conv.members[0] === conv.members[1] && conv.members[0] === selectedUser);

    if (selectedUser === this.global.login && tmp)
      return (tmp);
    else
      return (undefined)
  }

  loginDifSelectedUsrANDuserFound(listConv: Array<if_conversation>, selectedUser: string) {
    const tmp: if_conversation | undefined = listConv.find(
      conv => conv.members.find( member => member === selectedUser));

    if (selectedUser != this.global.login && tmp)
      return (tmp);
    else
      return (undefined);
  }

  createPrivateRoom(selectedUser: string) {
    const data = {
      id: 0,
      avatar: '../../../assets/profile-picture/ageraud.jpeg',
      type: 'private',
      name: this.createPrivateRoomName(this.global.login as string, selectedUser),
      password: '',
      members: new Array<string>(selectedUser, this.global.login as string)
    };
    return (data);
  }
}
