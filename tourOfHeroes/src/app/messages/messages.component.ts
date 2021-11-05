import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
  }

}

// export class MessagesComponent implements OnInit {

//   constructor(private messageService: MessageService) {}

//   ngOnInit(): void {
//   }

//   getMessages(): string[] {
//     return this.messageService.messages;
//   }

//   clear(): void {
//     this.messageService.clear();
//   }

// }
