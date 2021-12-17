import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { MessageDto } from "src/dtos/messages.dto";
import { ChatterEntity } from "src/entities/eb-chatter.entity";
import { ConversationEntity } from "src/entities/eb-conversation.entity";
import { ConvService } from "src/services/newConv/sb-conv.service";
import { ChatService } from "src/services/sb-chat.service";
import { GlobalDataService } from "src/services/sb-global-data.service";

@WebSocketGateway({cors:{origin: 'http://127.0.0.1'}})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
	conv_id: number = 0;

	constructor(private chatService: ChatService,
              private ConvService: ConvService){}
	@WebSocketServer()
	server;

  emitFail(to:string | string[], error: string) {
    this.server.emit('error', error);
  }

	handleConnection() {
			console.log('chat connected')
		}

	handleDisconnect() {
		console.log('chat disconnection');
	}

  async errorResponse(emission) {
    const messArray: Array<MessageDto> = await this.chatService.getMessage(emission.data);
    messArray.push({
      body: 'An error has occured',
      conv_id: emission.data.conv_id,
      date: new Date(),
      id: emission.id,
      login: emission.login,
      to: emission.login
    })
    this.server.to(emission.login).emit('allMessages', messArray);
  }

	@SubscribeMessage('message')
	async messageFunc(@MessageBody() emission) {
    console.log('message')
		const messages = await this.chatService.handleMessage(emission);
    if (typeof(messages) !== 'string') {
      const receivers = await this.chatService.getReceiverMessages(emission.data.conv_id);
      const tmp = new Set<string>(receivers);
      this.server.to(this.chatService.getReceiver(tmp, emission.login)).emit('allMessages', messages);
    }
    else
      this.errorResponse(emission);
	}

	@SubscribeMessage('getMessages')
	async getMessages(@MessageBody() emission, @MessageBody('data') message: MessageDto) {
    console.log('getMessages')
		const messages = await this.chatService.findAllMessages(Number(message.body));
		const response: MessageDto = {
			conv_id: message.conv_id,
			body: messages,
			date: new Date(),
			id: '',
			login: '',
			to: GlobalDataService.loginIdMap.get(emission.login),
		}
		this.server.to(GlobalDataService.loginIdMap.get(emission.login)).emit('allMessages', response);
	}

	@SubscribeMessage('newConversation')
	async newConversation(@MessageBody() emission, @MessageBody('data') newConvDatas: ConversationEntity) {
		const tmp = await this.ConvService.createConv(newConvDatas) as any;
    if (tmp.success === true) {
      const convId  = tmp.data.identifiers[0].conv_id;
      for (const name of newConvDatas.members) {
        const chatter: ChatterEntity = {
          chat_role: (name === emission.login) ? "admin" : "chatter",
          conv_id: convId,
          created: new Date(),
          is_present: "yes",
          login: name,
          muted_until: new Date(),
          updated: new Date()
        };
        const checkCreationChatter = await this.chatService.createChatter(chatter)
        console.log('checkCreation = ', checkCreationChatter);
        if (typeof(checkCreationChatter) === "string" && checkCreationChatter != 'ac')
          this.emitFail(emission.login, checkCreationChatter);
      }
			newConvDatas.conv_id = convId
			this.server.to(this.chatService.getReceiver(new Set(newConvDatas.members), emission.login)).emit('newConversation', newConvDatas);
		}
    else if (typeof(tmp.data) !== 'string') {
      this.server.to(this.chatService.getReceiver(new Set(newConvDatas.members), emission.login)).emit('newConversation', tmp.data);
    }
    else {
      this.conv_id--;
      console.log('Emission ', emission.socketId);
      this.server.to(emission.socketId).emit('error', tmp);
    }
	}

	@SubscribeMessage('allConversations')
	async getConv(@MessageBody() emission) {
    console.log('allConversation')
    console.log('emitter = ', GlobalDataService.loginIdMap.get(emission.login))
		this.server.to(GlobalDataService.loginIdMap.get(emission.login)).emit('allConversations', await this.ConvService.findAllConv(emission.login));
	}
}