import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { MessageDto } from "src/dtos/createUser.dto";
import { ChatServiceBis } from "src/services/sb-chat-bis.service";
import { ChatService } from "src/services/sb-chat.service";
import { GlobalDataService } from "src/services/sb-global-data.service";

@WebSocketGateway({cors:{origin: 'http://127.0.0.1'}})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
	conv_id: number = 0;

	constructor(private chatService: ChatService,
				private chatServiceBis: ChatServiceBis){}
	@WebSocketServer()
	server;

	handleConnection() {
			console.log('chat connected')
			this.server.emit('usersOnLine', this.chatServiceBis.getUsersConnected(GlobalDataService.loginIdMap))
		}

	handleDisconnect() {
		console.log('chat disconnection');
	}

	@SubscribeMessage('message')
	messageFunc(@MessageBody() message: MessageDto) {
		// this.chatService.handleMessage(this.server,message);
	}
}