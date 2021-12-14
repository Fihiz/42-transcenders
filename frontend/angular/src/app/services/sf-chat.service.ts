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
			if (conv.members.size === 2 && conv.members.has(value))
			theConv = conv;
		}
		return (theConv)
	}
}
