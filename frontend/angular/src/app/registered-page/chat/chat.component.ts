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
  	ulMessages : any;


  constructor(private socket: Socket) { }

  // - multi Socket - ?
  ngOnInit(): void {
    this.socket.on('usersOnLine', (data: any) => {
		console.log('usersOnLine = ', data)
        this.usersOnLine = data;
    });
	this.socket.on('message', ( data: any) => {
		this.handleNewMessage(data);
	});
  }

  /* Sending to the server */
  handleSubmitNewMessage() {
	this.inputMessage = (<HTMLInputElement>(document.getElementById('input-message'))).value;
	this.ulMessages = (<HTMLInputElement>(document.getElementById('ul-messages')));
	console.log(this.inputMessage);
	
	/* Protecting empty line, -add a protect-placeholder as input-prompt to block submit if empty?- */
	if (this.inputMessage)
		this.socket.emit('message', this.inputMessage );
	
	/* Clean the sending line, may be different ways to deal with */
	if (this.inputMessage)
	{
		console.log('Cleaning line');
		(<HTMLInputElement>(document.getElementById('input-message'))).value = '';
	}

	/* REMINDER FROM GATEWAY: handleMassage(@MessageBody() content: string) : void
		-> content = this.inputMessage */
  }

	
 	
	/* A way to listen incoming messages and populate them */
  	handleNewMessage(inputMessage : string) {
	 this.ulMessages.appendChild(this.buildNewMessage(inputMessage));
  	}

  	buildNewMessage(inputMessage : string) {
	  const li = document.createElement("li");
	  li.appendChild(document.createTextNode(inputMessage));
	  return li;
  	}
}
