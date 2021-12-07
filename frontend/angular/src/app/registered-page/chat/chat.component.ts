import { Component, OnInit } from '@angular/core';
import { if_message } from 'src/app/interfaces/if-message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messageTab: Array<if_message> = [];


  constructor() { }

  ngOnInit(): void {
  }

}
