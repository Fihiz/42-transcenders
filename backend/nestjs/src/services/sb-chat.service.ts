import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageDto } from "src/dtos/messages.dto";
import { ChatterEntity } from "src/entities/eb-chatter.entity";
import { ConversationEntity } from "src/entities/eb-conversation.entity";
import { MessageEntity } from "src/entities/eb-message.entity";
import { WebAppUserEntity } from "src/entities/eb-web-app-user.entity";
import { Repository } from "typeorm";
import { ConvService } from "./newConv/sb-conv.service";
import { GlobalDataService } from "./sb-global-data.service";
import { UserService } from "./sb-user.service";

@Injectable()
export class ChatService {

		private convId: number = 0;
    private messId = 0;

		constructor(
				@InjectRepository(MessageEntity)
				private messages: Repository<MessageEntity>,
        @InjectRepository(ConversationEntity)
        private conversation: Repository<ConversationEntity>,
        @InjectRepository(ChatterEntity)
				private chatter: Repository<ChatterEntity>,
        private userService: UserService,
        private newConvService: ConvService) {}

		

    async createChatter(chatter: ChatterEntity) {
      console.log('Chatter creation');
      try {
          const isFind = await this.findOneChatter(chatter.conv_id, chatter.login)
          if (!isFind) {
          const chatterInserted = await this.chatter.insert(chatter);
          return (chatterInserted);
        }
        else
          return ('ac');
      }
      catch (error) {
        return `error.severity: ${error.severity}, 
  \     code: ${error.code},
  \     detail: ${error.detail}`;
      }
    }

    async createMessage(message: MessageEntity): Promise<number | MessageEntity | string> {
      console.log('Message creation');
      try {
          await this.messages.insert(message);
          return (message);
      }
      catch (error) {
        return `error.severity: ${error.severity}, 
  \     code: ${error.code},
  \     detail: ${error.detail}`;
      }
    }

  async findOneChatter(id: number, name: string) {
    return (await this.chatter.findOne({where: {conv_id: id, login: name}}));
  }



  async findOneMessage(id: number) {
    return this.messages.find({id: id});
  }
	


	async getUsers() {
			const tmp: Array<WebAppUserEntity> = await this.userService.findAllAppUser();
      const users: Array<string> = new Array<string>();
      for (const user of tmp) {
        users.push(user.login);
      }
			return (users);
	}


	async findAllMessages(id: number) {
			return (this.messages.find({conv_id: id}));
	}


	getReceiver(tabLogin: Set<string>, emitter: string): Array<string> {
		const tabReceiver: Array<string> = [];
		tabLogin.forEach(login => {
				GlobalDataService.loginIdMap.get(login)?.forEach(id => {
				tabReceiver.push(id);
			})
		})
			GlobalDataService.loginIdMap.get(emitter).forEach(id => {
			tabReceiver.push(id);
		})
		return (tabReceiver);
	}

  async getReceiverMessages(convId: number): Promise<Array<string>> {
		const chatters = await this.chatter.find({where: {conv_id: convId}});
    const tabReceiver: Array<string> = new Array<string>();
    for (const chatter of chatters) tabReceiver.push(chatter.login);
		return (tabReceiver);
	}


  async getMessage(message: MessageDto) {
    const messages: MessageEntity[] = await this.findAllMessages(message.conv_id);
    const finalMessages: MessageDto[] = [];
    for (const mess of messages) {
      const tmp: MessageDto = {
        id: mess.id,
        body: mess.content,
        conv_id: mess.conv_id,
        date: mess.date,
        login: mess.login,
        to: message.to,
      };
      finalMessages.push(tmp);
    }
    return (finalMessages);
  }

  async handleMessage(emission) {
    const message = emission.data
    const doesConvExists = await this.newConvService.findOneConversation(message.conv_id);
    console.log(doesConvExists)
    if (doesConvExists) {
      const messRegistered: MessageEntity = {
        content: message.body,
        conv_id: message.conv_id,
        date: message.date,
        id: ++this.messId,
        login: emission.login
      }
      await this.createMessage(messRegistered);
      const convMEssages = await this.getMessage(message);
      console.log("conversation messages = ", convMEssages)
      return (convMEssages);
    }
    else
      return ('Error: Conv not exists')
  }

}