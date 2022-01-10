import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { MessageDto } from "src/dtos/messages.dto";
import { ConversationEntity } from "src/entities/eb-conversation.entity";
import { MessageEntity } from "src/entities/eb-message.entity";
import { ChatterService } from "src/services/sb-chatter.service";
import { ConvService } from "src/services/sb-conv.service";
import { ChatService } from "src/services/sb-chat.service";
import { GlobalDataService } from "src/services/sb-global-data.service";
import { AppService } from "src/app.service";
import { UserService } from "src/services/sb-user.service";
import { WebAppUserEntity } from "src/entities/eb-web-app-user.entity";
import { InvitationEntity } from "src/entities/eb-invitation.entity";
import { GameService } from "src/services/sb-game.service";
import { GameTypeEntity } from "src/entities/eb-game-type.entity";

@WebSocketGateway({cors:{origin: '*'}})

export class ChatGateway {
	conv_id: number = 0;

  invits: { conv_id: number, id: string, login: string }[] = [];

	constructor(private chatService: ChatService,
              private ConvService: ConvService,
							private chatterService: ChatterService,
							private gameService: GameService,
              private userService: UserService){}

	@WebSocketServer()
	server;

  // emitFail(to:string | string[], error: string) {
  //   this.server.emit('error', error);
  // }

  async errorResponse(emission) {
    const messArray: Array<MessageEntity> = await this.chatService.getMessage(emission.data);
    messArray.push({
			content: 'An error has occured',
      conv_id: emission.data.conv_id,
      date: new Date(),
      id: emission.id,
      login: emission.login,
      avatar:'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.techtribune.net%2Fanime%2Fshrek-occupe-la-premiere-place-pour-lanime-sur-amazon%2F102182%2F&psig=AOvVaw20kB0wPmvDnlD_FTcqSOBO&ust=1640873495902000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJDgu66YifUCFQAAAAAdAAAAABAD',
      role: 'chatter',
      invitation: emission.data.invitation
    })
    console.log("PLAY BACK \n", emission.login);
    this.server.to(emission.login).emit('allMessages', messArray);
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
        this.errorResponse(emission);
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
    // if (message.host)
    //   messages.forEach(msg => {
    //     msg.avatar = msg.avatar.replace("localhost:3000", message.host);
    //   });
		if (typeof(messages) !== 'string') {
			this.server.to(GlobalDataService.loginIdMap.get(emission.login)?.sockets.map((socket) => {return socket.id;})).emit('allMessages', messages);
    }
    else
      this.errorResponse(emission);
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
		}
    else 
      this.server.to(emission.socketId).emit('error', tmp);
	}

	@SubscribeMessage('allConversations')
	async getConv(@MessageBody() emission) {
		this.server.to(GlobalDataService.loginIdMap.get(emission.login)?.sockets.map((socket) => {return socket.id;})).emit('allConversations', await this.ConvService.findAllConv(emission.login));
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
      response.emit('error', "You have been banned from this room");
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

  @SubscribeMessage('setInvitation')
	async setInvitationFunc(@MessageBody() emission) {
    // CHECK INVITATION / STATUS
    const alreadyInvited = await this.ConvService.getInvitationRoomById(emission.data.conv_id);
    const receiver = emission.data.logins_conv.find((search) => search !== emission.login);
    const statusReceiver = GlobalDataService.loginIdMap.get(receiver)?.status;
    // CAS D'ERREURS: ADVERSARY OFFLINE
    if (statusReceiver === undefined) {
      if (alreadyInvited)
        this.ConvService.unsetInvitation(alreadyInvited);
      this.server.to(emission.socketId).emit('errorInvitation', this.chatService.errorMessage(emission, "User not connected..."));
      return;
    }
    // CAS D'ERREURS: ADVERSARY INGAME
    else if (statusReceiver === "Playing") { // TODO: CHECK VALUE OF "INGAME"
      if (alreadyInvited)
        this.ConvService.unsetInvitation(alreadyInvited);
      this.server.to(emission.socketId).emit('errorInvitation', this.chatService.errorMessage(emission, "Already in a game..."));
      return;
    }
    // INVITATION EXIST
    if (alreadyInvited !== undefined) {
      const emitter: WebAppUserEntity = alreadyInvited.emitter as any as WebAppUserEntity;
      // SEND INVITATION DURING INVITATION FROM ADVERSARY
      if (emitter.login !== emission.login) {
        if (alreadyInvited && emission.data.type === null)
          emission.data.type = alreadyInvited.game_type;
        const search: GameTypeEntity = await this.gameService.searchOneTypeOfGame(emission.data.type);
        // TYPE GAME EXIST
        if (search) {
          if (emission.data.invitation === true && alreadyInvited.game_type !== emission.data.type) {
            console.log(`${emission.login} a déjà fait une demande de type differente.`);
            this.ConvService.unsetInvitation(alreadyInvited);
            this.server.to(emission.socketId).emit('errorInvitation', this.chatService.errorMessage(emission, "Type game differs... Last invitation deleted!"));
            return;
          }
          const invitation = await this.ConvService.getInvitationRoomById(emission.data.conv_id);
          const id = await this.gameService.createMatchParty((invitation.emitter as any as WebAppUserEntity).login, (invitation.receiver as any as WebAppUserEntity).login, search);
          const party = await this.gameService.getPartyById(id);
          this.gameService.addGame(party.game_id, (party.player1 as unknown as WebAppUserEntity), (party.player2 as unknown as WebAppUserEntity));      
          this.ConvService.unsetInvitation(invitation);
          emission.data.content = "Invitation accepted!";
          emission.data.invitation = false;
          const messages = await this.chatService.handleMessage(emission);
          if (typeof(messages) !== 'string') {
            const receivers = new Set(await this.chatService.getReceiverMessages(emission.data.conv_id));
            this.server.to(this.chatService.getReceiver(receivers, emission.login)).emit('allMessages', messages);
            this.server.to(this.chatService.getReceiver(receivers, emission.login)).emit('launchgameInvitation', party.game_id);
          }
        }
        // CAS D'ERREURS: TYPE GAME NOT EXIST
        else {
          this.server.to(emission.socketId).emit('errorInvitation', this.chatService.errorMessage(emission, "Type game not exist..."));
          return;
        }
        console.log(`${emission.login} a fait une demande pour jouer alors qu'il a été invité.`);
      }
      // SEND DOUBLE INVITATION
      else {
        console.log(`${emission.login} a déjà fait une demande pour jouer.`);
        this.server.to(emission.socketId).emit('errorInvitation', this.chatService.errorMessage(emission, "Request to play already launched..."));
        return;
      }
    }
    // INVITATION NOT EXIST
    else {
      if (emission.data.content === "Invitation accepted!") {
        console.log(`${emission.login} a accepté une une invitation expirée.`);
        this.server.to(emission.socketId).emit('errorInvitation', this.chatService.errorMessage(emission, "Invitation has expired..."));
        return;
      }
      else {
        console.log(`${emission.login} fait une demande pour jouer.`);
        await this.ConvService.setInvitation(emission.data.conv_id, emission.login, emission.data.logins_conv.find((login) => login !== emission.login), emission.game_type);
        const messages = await this.chatService.handleMessage(emission);
        if (typeof(messages) !== 'string') {
          const receivers = new Set(await this.chatService.getReceiverMessages(emission.data.conv_id));
          console.log(receivers);
          this.server.to(this.chatService.getReceiver(receivers, emission.login)).emit('allMessages', messages);
        }
      }
    }
	}

  @SubscribeMessage('unsetInvitation')
	async unsetInvitationFunc(@MessageBody() emission) {
    const invitation = await this.ConvService.getInvitationRoomById(emission.data.conv_id);
    if (invitation !== undefined) {
      await this.ConvService.unsetInvitation(invitation);
      emission.data.content = "Invitation refused!";
      emission.data.invitation = false;
      const messages = await this.chatService.handleMessage(emission);
      if (typeof(messages) !== 'string') {
        const receivers = new Set(await this.chatService.getReceiverMessages(emission.data.conv_id));
        this.server.to(this.chatService.getReceiver(receivers, emission.login)).emit('allMessages', messages);
      }
    }
    // CAS D'ERREURS: INVITATION NOT EXIST
    else {
      console.log(`${emission.login} repond a une invitation expirée.`);
      this.server.to(emission.socketId).emit('errorInvitation', this.chatService.errorMessage(emission, "Invitation has expired..."));
      console.log(this.chatService.errorMessage(emission, "Type game not exist..."));
      return;
    }
	}

}