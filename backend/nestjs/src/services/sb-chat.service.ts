import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageDto } from "src/dtos/messages.dto";
import { ChatterEntity } from "src/entities/eb-chatter.entity";
import { MessageEntity } from "src/entities/eb-message.entity";
import { WebAppUserEntity } from "src/entities/eb-web-app-user.entity";
import { Repository } from "typeorm";
import { ConvService } from "./sb-conv.service";
import { GlobalDataService } from "./sb-global-data.service";
import { UserService } from "./sb-user.service";

@Injectable()
export class ChatService {

    private messId = 0;

		constructor(
				@InjectRepository(MessageEntity)
				private messages: Repository<MessageEntity>,
        @InjectRepository(ChatterEntity)
				private chatter: Repository<ChatterEntity>,
        private userService: UserService,
        private convService: ConvService) {}


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
    const messages: Array<MessageEntity> = await this.messages.find({
      where: {conv_id: id},
        join: {
          alias: "tmp",
          leftJoinAndSelect: {
            login: "tmp.login",
          }},
      });
      messages.sort((a,b) => a.id < b.id ? -1 : 1)
      for (const message of messages) {
        message.conv_id = id;
        message.login = (message.login as any).login;
      }
			return (messages);
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
		const tmp = await this.chatter.find(
      {join: {
        alias: "login",
        leftJoinAndSelect: {
          conv_id: "login.login",
        }},
      where: {conv_id: convId}
    });
    const receivers = new Array<string>();
    for (const receiver of tmp) {
      receivers.push((receiver as any).login.login);
    }
		return (receivers);
	}


  async findOneChatter(login: string, conv_id: number) {
    const user = await this.chatter.findOne({
      where: {
        login: login,
        conv_id: conv_id
      },
      join: {
        alias: "tmp",
        leftJoinAndSelect: {
          login: "tmp.login",
      }},
    })
    if (!user)
      return(undefined);
    const finalUser: ChatterEntity = {
      chat_role: user.chat_role,
      conv_id: conv_id,
      is_present: user.is_present,
      login: (user.login as any).login,
      muted: user.muted,
      ban: false
    }
    return (finalUser)
  }

  async getMessage(message: MessageDto) {
    const messages: MessageEntity[] = await this.findAllMessages(message.conv_id);
    return (messages);
  }

  async handleMessage(emission) {
    const message = emission.data
    const doesConvExists = await this.convService.findOneConversation(message.conv_id);
    const chatter = await this.chatter.findOne({login: emission.login, conv_id: message.conv_id});
    if (doesConvExists) {
      const messRegistered: MessageEntity = {
        content: message.content,
        conv_id: message.conv_id,
        date: message.date,
        id: ++this.messId,
        login: emission.login,
        avatar: 'data:image/jpeg;base64,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',
        role: chatter.chat_role
      }
      const messageCreated = await this.createMessage(messRegistered)
			if (typeof(messageCreated) !== 'string' && typeof(messageCreated) !== 'number')
				this.messId = messageCreated.id;
      const convMessages = await this.getMessage(message);
      return (convMessages);
    }
    else
      return ('Error: Conv does not exist')
  }

  async checkConditionToModifie(userToBan, userAsking, conv_id) {
    
    const target = await this.findOneChatter(userToBan, conv_id);
    const client = await this.findOneChatter(userAsking, conv_id); 
    if (target.chat_role === 'owner' || (target.chat_role === 'admin' && client.chat_role != 'owner') && client.chat_role === 'chatter') {
      console.log('fail not good role')
      return ('ko');
    }
    return (target);
  }

  async addAdminInConv(target, conv_id) {
    try {
      await this.chatter.update({login: target, conv_id: conv_id}, {chat_role: 'admin'})
      return ('ok');
    }
    catch {
      return ('ko');
    }
  }

}