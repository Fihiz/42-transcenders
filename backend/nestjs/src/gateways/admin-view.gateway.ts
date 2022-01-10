import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { UserService } from "src/services/sb-user.service";

@WebSocketGateway({cors:{origin: '*'}})

export class AdminViewGateway {

constructor(private userService: UserService ){}

@WebSocketServer()
server;

  @SubscribeMessage('allUsersInApp')
  async getAllUsersInApp(@MessageBody() emission) {
		this.server.emit('allUsersInApp', await this.userService.findAllAppUser());
	}

  @SubscribeMessage('currentUserNewRoleInApp')
  async getCurrentUserNewRoleInApp(@MessageBody() emission) {
		this.server.emit('updatedUserGlobalRole', await this.userService.findOneAppUser(emission));
	}


  // @SubscribeMessage('getNewUser')
  // async getNewUser(@MessageBody() emission) {
	// 	this.server.emit('allUsersInApp', await this.userService.findAllAppUser());
	// }

}