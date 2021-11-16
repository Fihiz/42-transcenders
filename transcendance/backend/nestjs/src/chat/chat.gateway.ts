import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Message } from "src/app.service";
import { ChatService } from "./chat.service";

@WebSocketGateway({cors:{origin: 'http://127.0.0.1'}})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect { 

	constructor(private chatService: ChatService){}
	@WebSocketServer()
	server;

	handleConnection() {
			console.log('chat connected')
		}

	handleDisconnect() {
		console.log('chat disconnection');
	}

	@SubscribeMessage('message')
	messageFunc(@MessageBody() message: Message) {this.chatService.handleMessage(this.server,message);}
}