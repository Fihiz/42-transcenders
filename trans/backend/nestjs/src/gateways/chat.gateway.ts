import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { ConversationDto } from "src/dtos/conversation.dto";
import { MessageDto } from "src/dtos/messages.dto";
import { ConversationEntity } from "src/entities/eb-conversation.entity";
import { ChatService } from "src/services/sb-chat.service";
import { GlobalDataService } from "src/services/sb-global-data.service";

@WebSocketGateway({cors:{origin: 'http://127.0.0.1'}})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
	conv_id: number = 0;

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
	messageFunc(@MessageBody() message: MessageDto) {
		// this.chatService.handleMessage(this.server,message);
	}

	@SubscribeMessage('getMessages')
	async getMessages(@MessageBody() emission, @MessageBody('data') message: MessageDto) {
		const messages = await this.chatService.getMessages(Number(message.body));
		// console.log('messages of the conv ', message.body, 'are: ', messages);
		const response: MessageDto = {
			conv_id: message.conv_id,
			body: messages,
			date: new Date(),
			id: '',
			login: '',
			to: GlobalDataService.loginIdMap.get(emission.login),
		}
		console.log("conv_id = ", response.conv_id)
		this.server.to(GlobalDataService.loginIdMap.get(emission.login)).emit('message', response);
	}

	@SubscribeMessage('newConversation')
	async createConv(@MessageBody() emission, @MessageBody('data') message: ConversationDto) {
		const convId = await this.chatService.createConv(message);
		if (typeof(convId) ==='number') {
			message.id = convId
			this.server.to(this.chatService.getReceiver(message.members, emission.login)).emit('newConversation', message);
		}
	}
}