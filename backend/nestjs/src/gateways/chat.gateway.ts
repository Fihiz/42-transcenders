//import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
//import { MessageDto } from "src/dtos/messages.dto";
//import { ChatServiceBis } from "src/services/sb-chat-bis.service";
//import { ChatService } from "src/services/sb-chat.service";
//import { GlobalDataService } from "src/services/sb-global-data.service";

//@WebSocketGateway({cors:{origin: 'http://127.0.0.1'}})
//export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
//	conv_id: number = 0;

//	constructor(private chatService: ChatService,
//				private chatServiceBis: ChatServiceBis){}
//	@WebSocketServer()
//	server;

//	handleConnection() {
//			console.log('chat connected')
//		}

//	handleDisconnect() {
//		console.log('chat disconnection');
//	}

//	@SubscribeMessage('message')
//	messageFunc(@MessageBody() message: MessageDto) {
//		// this.chatService.handleMessage(this.server,message);
//	}
//}

import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway({cors:{origin: 'http://127.0.0.1'}}) //cors
export class ChatGateway {

	inc : number = 0;
	@WebSocketServer()
	server;

	@SubscribeMessage('message') // Client emit a message
	handleMassage(@MessageBody() content: string) : void {
		console.log(this.inc++, "Je passe dans le subscribe message");
		this.server.emit('message', content); // We broadcast it to the server
	}
}