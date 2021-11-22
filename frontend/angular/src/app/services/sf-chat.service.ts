import { Injectable } from '@angular/core';
import { if_chat } from '../interfaces/if-chat';

@Injectable({
  providedIn: 'root',
})
export class SfChatService {
  chat?: if_chat;

  constructor() {}
}
