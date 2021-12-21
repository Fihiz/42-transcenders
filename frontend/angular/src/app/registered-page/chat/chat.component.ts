import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { if_message } from 'src/app/interfaces/if-message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

/* USELESS */
//  messageTab: Array<if_message> = [];
//  usersOnLine: Set<string> = new Set();

	usersOnLine: Array<string> = new Array();
	inputMessage : string = '';
//  ulMessages : Array<string> = [];


  constructor(private socket: Socket) { }

  // Indépendant du this.socket.emit qui trouve le bon subscribe - multi Socket ?
  ngOnInit(): void {
    this.socket.on('usersOnLine', (data: any) => {
		console.log('usersOnLine = ', data)
        this.usersOnLine = data;
    });
  }

  /* Sending to the server */
  handleSubmitNewMessage() {
	this.inputMessage = (<HTMLInputElement>(document.getElementById('input-message'))).value;
	console.log(this.inputMessage);
	this.socket.emit('message', {data : this.inputMessage} );
	/* handleMassage(@MessageBody() content: string) : void
	content = this.inputMessage */
  }

  /* Need a way to listen incoming messages and populate them */

//  this.socket.on('')

//  handleNewMessage = (message) => {
//	 this.ul
//  }
}
