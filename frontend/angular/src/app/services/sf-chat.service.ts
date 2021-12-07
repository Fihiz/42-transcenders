import { Injectable } from '@angular/core';
import { if_chat } from '../interfaces/if-chat';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chat?: if_chat;

  constructor() {}
}
