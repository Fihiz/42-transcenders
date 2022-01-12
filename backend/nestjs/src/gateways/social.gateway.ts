import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { GlobalDataService } from "src/services/sb-global-data.service";

@WebSocketGateway({cors:{origin: '*'}})

export class SocialGateway {

  @WebSocketServer()
	server;


  @SubscribeMessage('block')
	async block(@MessageBody() emission) {
    this.server.to(GlobalDataService.loginIdMap.get(emission.login)?.sockets.map((socket) => {return socket.id;})).emit('block', emission.data.data.newFriendLogin);
	} 

  @SubscribeMessage('unBlock')
	async unBlock(@MessageBody() emission) {
    this.server.to(GlobalDataService.loginIdMap.get(emission.login)?.sockets.map((socket) => {return socket.id;})).emit('unBlock', emission.data.data.newFriendLogin);
	}

}