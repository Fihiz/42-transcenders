import { Injectable } from '@angular/core';
import { if_chat } from '../interfaces/if-chat';
import { if_conversation } from '../interfaces/if_conversation';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chat?: if_chat;


  constructor() {}	
	
	conversationExists(value: string , listConv: Array<if_conversation>): if_conversation | undefined {
		let theConv: if_conversation | undefined = undefined
		for (const conv of listConv) {
			if (conv.members.length === 2 && conv.members.find(val => val === value))
			theConv = conv;
		}
		return (theConv)
	}

  createPrivateRoom(pseudo1:string, pseudo2:string) {
    if (!pseudo1 || !pseudo2)
      return (null);
    if (pseudo1.localeCompare(pseudo2) <= 0)
      return (`${pseudo1}-${pseudo2}`);
    else
      return (`${pseudo2}-${pseudo1}`);
  }
}
