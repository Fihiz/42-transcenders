import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { ConversationEntity } from "src/entities/eb-conversation.entity";
import { ConvService } from "src/services/Conv/sb-conv.service";
import { ChatService } from "src/services/sb-chat.service";
import { GlobalDataService, Message } from 'src/services/sb-global-data.service';
import { json } from "stream/consumers";

@WebSocketGateway({cors:{origin: 'http://127.0.0.1'}})
export class ConnectedGateway {
  constructor(private chatService: ChatService,
              private convService: ConvService){}
	@WebSocketServer()
	server;

	handleConnection() {
			console.log('connection connected')
	}

	handleDisconnect(@MessageBody() message) {
		let keyIndex: string;
		const theWantedId: string = message.id;
		GlobalDataService.loginIdMap.forEach((arg, key) => {
			arg.forEach((el) => {
				if (el === theWantedId)
					keyIndex = key;
			})
		})
		if (keyIndex) {
			const index = GlobalDataService.loginIdMap.get(keyIndex).indexOf(theWantedId);
			GlobalDataService.loginIdMap.get(keyIndex).splice(index, 1);
			if (GlobalDataService.loginIdMap.get(keyIndex).length === 0)
				GlobalDataService.loginIdMap.delete(keyIndex)
		}
	}

	@SubscribeMessage('introduction')
	async handleIntroduce(@MessageBody() message: Message): Promise<void> {
    let conversations: Array<ConversationEntity>;
		if (message.id) {
			if (GlobalDataService.loginIdMap.has(message.login))
			GlobalDataService.loginIdMap.get(message.login).push(message.id);
			else {
				GlobalDataService.loginIdMap.set(message.login, [message.id]);
			}
      conversations = await this.convService.findAllConv(message.login);
		}
		this.server.emit('users', await this.chatService.getUsers());
    this.server.to(GlobalDataService.loginIdMap.get(message.login)).emit('allConversations', conversations);
	}

	@SubscribeMessage('log-out')
	handleLeaving(@MessageBody() message: Message): void {
		const dest = GlobalDataService.loginIdMap.get(message.login);
		this.server.to(dest).emit('disconnection', 'disconnection');
	}
}
