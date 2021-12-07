import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { GlobalDataService, Message } from 'src/services/sb-global-data.service';

@WebSocketGateway({cors:{origin: 'http://127.0.0.1'}})
export class ConnectedGateway {
  constructor(){}
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
		const index = GlobalDataService.loginIdMap.get(keyIndex).indexOf(theWantedId);
		GlobalDataService.loginIdMap.get(keyIndex).splice(index, 1);
		if (GlobalDataService.loginIdMap.get(keyIndex).length === 0)
			GlobalDataService.loginIdMap.delete(keyIndex); // -> signaler a tt le monde
		console.log('map after disconnect', GlobalDataService.loginIdMap);
	}

	@SubscribeMessage('introduction')
	handleIntroduce(@MessageBody() message: Message): void {
		if (message.id) {
			if (GlobalDataService.loginIdMap.has(message.login))
			GlobalDataService.loginIdMap.get(message.login).push(message.id);
			else {
				GlobalDataService.loginIdMap.set(message.login, [message.id]);
			}
			console.log('new connection', GlobalDataService.loginIdMap)
		}
	}

	@SubscribeMessage('log-out')
	handleLeaving(@MessageBody() message: Message): void {
		const dest = GlobalDataService.loginIdMap.get(message.login);
		this.server.to(dest).emit('disconnection', 'disconnection');
	}
}
