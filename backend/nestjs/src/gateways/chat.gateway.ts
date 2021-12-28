import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { getPackedSettings } from "http2";
import { type } from "os";
import { MessageDto } from "src/dtos/messages.dto";
import { ChatterEntity } from "src/entities/eb-chatter.entity";
import { ConversationEntity } from "src/entities/eb-conversation.entity";
import { MessageEntity } from "src/entities/eb-message.entity";
import { ChatterService } from "src/services/chatter/sb-chatter.service";
import { ConvService } from "src/services/Conv/sb-conv.service";
import { ChatService } from "src/services/sb-chat.service";
import { GlobalDataService } from "src/services/sb-global-data.service";

@WebSocketGateway({cors:{origin: 'http://127.0.0.1'}})
export class ChatGateway {
	conv_id: number = 0;

	constructor(private chatService: ChatService,
              private ConvService: ConvService,
							private chatterService: ChatterService){}

	@WebSocketServer()
	server;

  emitFail(to:string | string[], error: string) {
    this.server.emit('error', error);
  }

  async errorResponse(emission) {
    const messArray: Array<MessageEntity> = await this.chatService.getMessage(emission.data);
    messArray.push({
			content: 'An error has occured',
      conv_id: emission.data.conv_id,
      date: new Date(),
      id: emission.id,
      login: emission.login,
    })
    this.server.to(emission.login).emit('allMessages', messArray);
  }

	@SubscribeMessage('message')
	async messageFunc(@MessageBody() emission) {
		const messages = await this.chatService.handleMessage(emission);
    if (typeof(messages) !== 'string') {
      const receivers = new Set(await this.chatService.getReceiverMessages(emission.data.conv_id));
      this.server.to(this.chatService.getReceiver(receivers, emission.login)).emit('allMessages', messages);
    }
    else
      this.errorResponse(emission);
	}

	@SubscribeMessage('getMessages')
	async getMessages(@MessageBody() emission, @MessageBody('data') message: MessageDto) {
		const messages = await this.chatService.getMessage(message);
		if (typeof(messages) !== 'string') {
			this.server.to(GlobalDataService.loginIdMap.get(emission.login)).emit('allMessages', messages);
    }
    else
      this.errorResponse(emission);
	}

	@SubscribeMessage('newConversation')
	async newConversation(@MessageBody() emission, @MessageBody('data') newConvDatas: ConversationEntity) {
    console.log('newConvDatas = ', newConvDatas);
    if (await this.ConvService.newConvcheckValue(newConvDatas) === false)
      return (this.emitFail(emission.login, 'error in input'));
		const tmp = await this.ConvService.createConv(newConvDatas) as any;
    if (tmp.success === true) {
      const convId  = tmp.data.identifiers[0].conv_id;
			const checkCreationChatter = await this.chatterService.creationChattersForNewConv(emission, newConvDatas, convId);
			if (checkCreationChatter === 'error')
				return (this.emitFail(emission.login, 'error in registering chatter'));
			newConvDatas.conv_id = convId;
			this.server.to(this.chatService.getReceiver(new Set(newConvDatas.members), emission.login)).emit('newConversation', newConvDatas);
		}
    else 
      this.server.to(emission.socketId).emit('error', tmp);
	}

	@SubscribeMessage('allConversations')
	async getConv(@MessageBody() emission) {
		this.server.to(GlobalDataService.loginIdMap.get(emission.login)).emit('allConversations', await this.ConvService.findAllConv(emission.login));
	}

	@SubscribeMessage('joinRoom')
	async joinRoom(@MessageBody() emission) {
		const response = this.server.to(GlobalDataService.loginIdMap.get(emission.login));
		const conv = await this.ConvService.joinRoom(emission, emission.login, false);
		typeof(conv) === 'undefined' ? response.emit('error', "room doesn't exist | a problem occured") : response.emit('newConversation', conv);
	}

  @SubscribeMessage('addFriend')
  async addFriend(@MessageBody() emission) {
    const conv_id = emission.data.conv_id;
    const friendName = emission.data.name;
    console.log('emission = ', emission)
    console.log('conv_id = ', conv_id, 'friendName = ', friendName)
    if (conv_id != 0) {
      const conv = await this.ConvService.joinRoom(emission, friendName, true);
      if (conv) {
        const receivers = this.chatService.getReceiver(new Set(conv.members), emission.login);
        console.log('receivers = ', receivers);
        this.server.to(receivers).emit('newMember', {conv_id: conv.conv_id, name: friendName});
        this.server.to(GlobalDataService.loginIdMap.get(friendName)).emit('newConversation', conv);
      }
      else {
      this.server.to(GlobalDataService.loginIdMap.get(emission.login)).emit('error', "room doesn't exist | a problem occured")
      }
    }
  }

  @SubscribeMessage('leaveRoom')
  async leaveRoom(@MessageBody() emission) {
    const user = await this.chatterService.findOneChatter(emission.data.conv_id, emission.data.login)
    await this.ConvService.removeMemberOfConv(emission.data.content, emission.data.conv_id, emission.login, user);
  }
}