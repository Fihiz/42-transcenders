import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { ConversationEntity } from "src/entities/eb-conversation.entity";
import { ConvService } from "src/services/sb-conv.service";
import { ChatService } from "src/services/sb-chat.service";
import { GlobalDataService, Message } from 'src/services/sb-global-data.service';

@WebSocketGateway({cors:{origin: '*'}})
export class ConnectedGateway {
  constructor(private chatService: ChatService,
              private convService: ConvService){}
	@WebSocketServer()
	server;

	handleConnection() {
			console.log('A new client is connected')
	}

	emitStatusToAll(login: string, status: string) {
		this.server.emit('status', {login: login, status: status});
	}

	emitAllStatusToOne(id: string) {
		GlobalDataService.loginIdMap.forEach((value, key) => {
			this.server.to(id).emit('status', {login: key, status: value.status});
		});
	}

	handleDisconnect(@MessageBody() message) {
		let keyIndex: string;
		const theWantedId: string = message.id;
		GlobalDataService.loginIdMap.forEach((arg, key) => {
			arg.sockets.map((socket) => {return socket.id;}).forEach((el) => {
				if (el === theWantedId)
					keyIndex = key;
			})
		})
		if (keyIndex) {
			const index = GlobalDataService.loginIdMap.get(keyIndex).sockets.findIndex((socket) => socket.id === theWantedId);
			GlobalDataService.loginIdMap.get(keyIndex).sockets.splice(index, 1);
			if (GlobalDataService.loginIdMap.get(keyIndex).sockets.length === 0 && GlobalDataService.loginIdMap.get(keyIndex).status != "Playing")
			{
				this.emitStatusToAll(keyIndex, 'Offline');
				GlobalDataService.loginIdMap.delete(keyIndex);
			}
		}
	}

	@SubscribeMessage('introduction')
	async handleIntroduce(@MessageBody() message: Message): Promise<void> {
    let conversations: Array<ConversationEntity>;
	if (message.id) {
		if (GlobalDataService.loginIdMap.has(message.login))
			GlobalDataService.loginIdMap.get(message.login).sockets.push({id: message.id, gameId: 0});
		else {
			this.emitStatusToAll(message.login, 'Online');
			GlobalDataService.loginIdMap.set(message.login, {status: 'Online', sockets: [{id: message.id, gameId: 0}]});
		}
		this.emitAllStatusToOne(message.id);
      	conversations = await this.convService.findAllConv(message.login);
	}
	this.server.emit('users', await this.chatService.getUsers());
	this.server.to(GlobalDataService.loginIdMap.get(message.login)?.sockets.map((socket) => {return socket.id;})).emit('allConversations', conversations);
}

	@SubscribeMessage('log-out')
	handleLeaving(@MessageBody() message: Message): void {
		const dest = GlobalDataService.loginIdMap.get(message.login)?.sockets.map((socket) => {return socket.id;});
		this.server.to(dest).emit('disconnection', 'disconnection');
	}
}
