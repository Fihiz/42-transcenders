import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { AppService, Data, Message } from "src/app.service";

@WebSocketGateway({cors:{origin: 'http://127.0.0.1'}})
export class ConnectionGateway implements OnGatewayConnection, OnGatewayDisconnect { 

	constructor(){}
	@WebSocketServer()
	server;

	handleConnection() {
			console.log('connection connected')
		}

	handleDisconnect(@MessageBody() message) {
		let keyIndex: string;
		const theWantedId: string = message.id;
		Data.loginIdMap.forEach((arg, key) => {
			arg.forEach((el) => {
				if (el === theWantedId)
					keyIndex = key;
			})
		})
		const index = Data.loginIdMap.get(keyIndex).indexOf(theWantedId);
		Data.loginIdMap.get(keyIndex).splice(index, 1);
		console.log('map after disconnect', Data.loginIdMap);
	}

	@SubscribeMessage('introduction')
	handleIntroduce(@MessageBody() message: Message): void {
		if (message.id) {
			if (Data.loginIdMap.has(message.login))
			Data.loginIdMap.get(message.login).push(message.id);
			else {
				Data.loginIdMap.set(message.login, [message.id]);
			}
			console.log('new connection', Data.loginIdMap)
		}
	}

	@SubscribeMessage('log-out')
	handleLeaving(@MessageBody() message: Message): void {
		const dest = Data.loginIdMap.get(message.login);
		this.server.to(dest).emit('disconnection', 'disconnection');
	}
}