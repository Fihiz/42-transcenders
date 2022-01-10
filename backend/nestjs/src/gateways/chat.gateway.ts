import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { MessageDto } from "src/dtos/messages.dto";
import { ConversationEntity } from "src/entities/eb-conversation.entity";
import { MessageEntity } from "src/entities/eb-message.entity";
import { ChatterService } from "src/services/sb-chatter.service";
import { ConvService } from "src/services/sb-conv.service";
import { ChatService } from "src/services/sb-chat.service";
import { GlobalDataService } from "src/services/sb-global-data.service";
import { UserService } from "src/services/sb-user.service";

@WebSocketGateway({cors:{origin: '*'}})

export class ChatGateway {
	conv_id: number = 0;

	constructor(private chatService: ChatService,
              private ConvService: ConvService,
							private chatterService: ChatterService,
              private userService: UserService){}

	@WebSocketServer()
	server;

  // emitFail(to:string | string[], error: string) {
  //   this.server.emit('error', error);
  // }

  async errorResponse(emission, content) {
    const messArray: Array<MessageEntity> = await this.chatService.getMessage(emission.data);
    messArray.push({
			content: content,
      conv_id: emission.data.conv_id,
      date: new Date(),
      id: emission.id,
      login: emission.login,
      avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLoHISAbaLunfRgJ2FHPtFsHUIPa5iC66eZwBK7uc8KgzpMzuDh3cPA4CfXz8mIQlpOpM&usqp=CAU',
      role: 'chatter'
    })
    this.server.to(emission.socketId).emit('allMessages', messArray);
  }

	@SubscribeMessage('message')
	async messageFunc(@MessageBody() emission) {
    const sender = await this.chatterService.findOneChatter(emission.data.conv_id, emission.login);
    if (sender && sender.muted !== true) {
		  const messages = await this.chatService.handleMessage(emission);
      if (typeof(messages) !== 'string') {
        const receivers = new Set(await this.chatService.getReceiverMessages(emission.data.conv_id));
        this.server.to(this.chatService.getReceiver(receivers, emission.login)).emit('allMessages', messages);
      }
      else
        this.errorResponse(emission, 'an error has occured');
    }
    else {
      this.errorResponse(emission, 'Sorry, you cannot talk. You have been muted.');
    }
	}

	@SubscribeMessage('changeRoleInConv')
	async changeRoleInConv(@MessageBody() emission) {
    console.log(`changeRoleInConv: ${emission}`);
    const login = emission.data.name;
    const role = emission.data.role;
    this.server.to(GlobalDataService.loginIdMap.get(login)?.sockets.map((socket) => {return socket.id;})).emit('updatedRoleInConv', role);
		// const messages = await this.chatService.getMessage(message);
		// if (typeof(messages) !== 'string') {
		// 	this.server.to(GlobalDataService.loginIdMap.get(emission.login)).emit('allMessages', messages);

	}

	@SubscribeMessage('getMessages')
	async getMessages(@MessageBody() emission, @MessageBody('data') message: MessageDto) {
		const messages = await this.chatService.getMessage(message);
    if (message.host)
      messages.forEach(msg => {
        msg.avatar = msg.avatar.replace("localhost:3000", message.host);
      });
		if (typeof(messages) !== 'string') {
			this.server.to(GlobalDataService.loginIdMap.get(emission.login)?.sockets.map((socket) => {return socket.id;})).emit('allMessages', messages);
    }
    else
      this.errorResponse(emission, 'an error has occured while getting messages');
	}

	@SubscribeMessage('newConversation')
	async newConversation(@MessageBody() emission, @MessageBody('data') newConvDatas: ConversationEntity) {
    if (await this.ConvService.newConvcheckValue(newConvDatas) === false)
        return this.server.to(GlobalDataService.loginIdMap.get(emission.login)?.sockets.map((socket) => {return socket.id;})).emit('error', "The entered information cannot be processed");
      // return (this.emitFail(emission.login, 'error in input')); /* Fail : emit an alert to all the users but only need on global login */
		const tmp = await this.ConvService.createConv(newConvDatas) as any;
    if (tmp.success === true) {
      const convId  = tmp.data.identifiers[0].conv_id;
			const checkCreationChatter = await this.chatterService.creationChattersForNewConv(emission, newConvDatas, convId);
			if (checkCreationChatter === 'error')
				// return (this.emitFail(emission.login, 'error in registering chatter'));
        return this.server.to(GlobalDataService.loginIdMap.get(emission.login)?.sockets.map((socket) => {return socket.id;})).emit('error', "The entered information cannot be processed");
			newConvDatas.conv_id = convId;
			this.server.to(this.chatService.getReceiver(new Set(newConvDatas.members), emission.login)).emit('newConversation', newConvDatas);
      //For View Room in chat
      this.server.emit('newAvailableRoomsInApp', newConvDatas);
		}
    else 
      this.server.to(emission.socketId).emit('error', tmp);
	}

	@SubscribeMessage('allConversations')
	async getConv(@MessageBody() emission) {
		this.server.to(GlobalDataService.loginIdMap.get(emission.login)?.sockets.map((socket) => {return socket.id;})).emit('allConversations', await this.ConvService.findAllConv(emission.login));
	}
  
  @SubscribeMessage('allAvailableRoomsInApp')
	async getAllAvailableRoomsInApp(@MessageBody() emission) {
		this.server.emit('allAvailableRoomsInApp', await this.ConvService.findAllAvailableRoomsInApp());
	}

	@SubscribeMessage('joinRoom')
	async joinRoom(@MessageBody() emission) {
    // CHAT GLOBAL LOGIN
    // const response = this.server.to(GlobalDataService.loginIdMap.get(emission.login));
    // PONG GLOBAL LOGIN
    const response = this.server.to(GlobalDataService.loginIdMap.get(emission.login)?.sockets.map((socket) => {return socket.id;}));
    const conv_id = (await this.ConvService.findOneConversationByName(emission.data.roomName))?.conv_id;
    const user = await this.chatterService.findOneChatter(conv_id, emission.login);
    if (user) {
      response.emit('error', "Why would you join again ? You may have a problem of ego");
      return;
    }
    const conv = await this.ConvService.joinRoom(emission, emission.login, false);
    if (typeof(conv) === 'undefined')
      response.emit('error', "The entered information cannot be processed")
    else {
      this.server.to(this.chatService.getReceiver(new Set(conv.members), emission.login)).emit('newMember', {conv_id: conv.conv_id, name: emission.data.login});
      response.emit('newConversation', conv);
    }
	}

  @SubscribeMessage('addFriend')
  async addFriend(@MessageBody() emission) {
    const conv_id = emission.data.conv_id;
    const friendName = emission.data.name;

    if (conv_id != 0 && (await this.userService.findOneAppUser(friendName))) {
      const conv = await this.ConvService.joinRoom(emission, friendName, true);
      if (await this.chatterService.unBan(friendName, conv_id) === 'ko')
        this.server.to(GlobalDataService.loginIdMap.get(emission.login)?.sockets.map((socket) => {return socket.id;})).emit('error', "The entered information cannot be processed");
      if (conv) {
        const receivers = this.chatService.getReceiver(new Set(conv.members), emission.login);
        this.server.to(receivers).emit('newMember', {conv_id: conv.conv_id, name: friendName});
        this.server.to(GlobalDataService.loginIdMap.get(friendName)?.sockets.map((socket) => {return socket.id;})).emit('newConversation', conv);
      }
      else {
      // CHAT GLOBAL LOGIN
      // this.server.to(GlobalDataService.loginIdMap.get(emission.login)).emit('error', "The entered information cannot be processed")
      // PONG GLOBAL LOGIN
        this.server.to(GlobalDataService.loginIdMap.get(emission.login)?.sockets.map((socket) => {return socket.id;})).emit('error', "The entered information cannot be processed");
      }
    }
    else {
      this.server.to(GlobalDataService.loginIdMap.get(emission.login)?.sockets.map((socket) => {return socket.id;})).emit('error', "The entered information cannot be processed");
    }
  }


  // @SubscribeMessage('leaveRoom')
  // async leaveRoom(@MessageBody() emission) {
  //   const conv = await this.ConvService.findOneConversation(emission.data.conv_id);
  //   const conv_id = conv.conv_id;
  //   const conv_name = conv.name;
  //   const members = this.chatService.getReceiver(new Set(conv.members), emission.login);
  //   if (conv.type === 'private') {
  //     this.ConvService.destroyRoom(conv);
  //     this.server.to(members).emit('youAreBan', {conv_id: conv_id, conv_name: conv_name});
  //   }
  //   else {
  //     const user = await this.chatterService.findOneChatter(emission.data.conv_id, emission.data.login)
  //     if ((await this.ConvService.removeMemberOfConv(emission.data.content, emission.data.conv_id, emission.login, user)) !== 'ok')
  //       this.emitFail(emission.socketId, 'error happend in removing the user');
  //     else {
  //       const conv = await this.ConvService.findOneConversation(emission.data.conv_id);
  //       this.server.to(this.chatService.getReceiver(new Set(conv.members), emission.login)).emit('MemberLeaves', {login: emission.login, conv_id: conv.conv_id});
  //     }
  //   }
  // }

  @SubscribeMessage('leaveRoom')
  async leaveRoom(@MessageBody() emission) {
    const conv = await this.ConvService.findOneConversation(emission.data.conv_id);
    const conv_id = conv.conv_id;
    const conv_name = conv.name;
    const members = this.chatService.getReceiver(new Set(conv.members), emission.login);
    if (conv.type === 'private') {
      this.ConvService.destroyRoom(conv);
      this.server.to(members).emit('youAreBan', {conv_id: conv_id, conv_name: conv_name});
      //For View Room in chat
      this.server.emit('deleteAvailableRoomsInApp', {conv_id: conv_id, conv_name: conv_name});
    }
    else {
      const user = await this.chatterService.findOneChatter(emission.data.conv_id, emission.data.login)
      if ((await this.ConvService.removeMemberOfConv(emission.data.content, emission.data.conv_id, emission.login, user)) !== 'ok')
        this.server.to(emission.socketId).emit('error happend in removing the user');
      else {
        const conv = await this.ConvService.findOneConversation(emission.data.conv_id);
        if (conv)
          this.server.to(this.chatService.getReceiver(new Set(conv.members), emission.login)).emit('MemberLeaves', {login: emission.login, conv_id: conv.conv_id});
      }
    }
  }

  @SubscribeMessage('aUserIsBan')
  async aUserIsBan(@MessageBody() emission) {
    const target = emission.data.target;
    const conv_id = emission.data.conv_id;
    const conv_name = emission.data.conv_name;
    const conv = await this.ConvService.findOneConversation(conv_id);
    if (conv) {
      this.server.to(GlobalDataService.loginIdMap.get(target)?.sockets.map((socket) => {return socket.id;})).emit('youAreBan', {conv_id: conv_id, conv_name: conv_name});
      this.server.to(this.chatService.getReceiver(conv.members, target)).emit('MemberLeaves', {login: target, conv_id: conv_id});
    }
  }

  @SubscribeMessage('changePassword')
  async changePassword(@MessageBody() emission) {
    const conv_id = emission.data.conv_id;
    const password = emission.data.password;
    const conv = await this.ConvService.findOneConversation(conv_id);
    if (await this.ConvService.changePassword(conv_id, password) === 'ok')
      this.server.to(this.chatService.getReceiver(new Set(conv.members), emission.login)).emit('newPassword', {conv_id: conv_id, password: password});
    else
      this.server.to(GlobalDataService.loginIdMap.get(emission.login)?.sockets.map((socket) => {return socket.id;})).emit('error', "a problem has occured")
  }
}