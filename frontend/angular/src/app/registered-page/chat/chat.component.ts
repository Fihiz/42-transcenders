import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { if_message } from 'src/app/interfaces/if-message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messageTab: Array<if_message> = [];
  usersOnLine: Set<string> = new Set();


  constructor(private socket: Socket) { }

  ngOnInit(): void {
    this.socket.on('usersOnLine', (data: any) => {
        this.usersOnLine = data;
    });
  }

  
}
