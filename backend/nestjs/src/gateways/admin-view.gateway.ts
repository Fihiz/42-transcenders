import { Global } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { ConversationEntity } from "src/entities/eb-conversation.entity";
import { AdminService } from "src/services/sb-admin.service";
import { ChatService } from "src/services/sb-chat.service";
import { ConvService } from "src/services/sb-conv.service";
import { GlobalDataService } from "src/services/sb-global-data.service";
import { UserService } from "src/services/sb-user.service";
import { ConnectionIsNotSetError } from "typeorm";

@WebSocketGateway({cors:{origin: '*'}})

export class AdminViewGateway {

constructor(private userService: UserService,
            private adminService: AdminService,
            private chatService: ChatService
            ){}


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

  @SubscribeMessage('GiveAllConv')
  async getAllConvForSa(@MessageBody() name) {
    // this.server.to(GlobalDataService.loginIdMap.get('pgoudet')?.sockets.map((socket) => socket.id ))?.emit('allConversationsSA', await this.adminService.findAllConvOfDb());
    const chattersRoles = await this.adminService.getChattersAndRoles();
    const convs = await this.adminService.findAllConvOfDb();
    const final = [convs, chattersRoles];
    this.server.to(GlobalDataService.loginIdMap.get(name)?.sockets.map((socket) => socket.id ))?.emit('allConversationsSA', final);
  }

  @SubscribeMessage('deleteRoom')
  async deleteRoom(@MessageBody() emission) {
    const conv: ConversationEntity = emission;
    const conv_id = conv.conv_id;
    const res = await this.adminService.removeConv(conv);
    if (res === 'ok') {
      console.log('conv info = ', conv_id, conv.name);
      this.server.to(this.chatService.getReceiver(new Set(conv.members), '')).emit('youAreBan', {conv_id: conv_id, conv_name: conv.name});
    }
  }
}
