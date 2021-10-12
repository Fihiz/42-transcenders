import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  // title = this.chatService.getMessage();
  
  constructor(private chatService: ChatService) { }
  
  pseudo = "pgoudet-42";
  onClick() {
    console.log('messge sended');
  }
  
  ngOnInit(): void {
    console.log(this.chatService.getMessage());
    
  }

}
