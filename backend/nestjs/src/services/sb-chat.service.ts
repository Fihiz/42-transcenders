import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MessageDto } from "src/dtos/messages.dto";
import { ChatterEntity } from "src/entities/eb-chatter.entity";
import { MessageEntity } from "src/entities/eb-message.entity";
import { WebAppUserEntity } from "src/entities/eb-web-app-user.entity";
import { Repository } from "typeorm";
import { ConvService } from "./Conv/sb-conv.service";
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
        private newConvService: ConvService) {}


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


  async getMessage(message: MessageDto) {
    const messages: MessageEntity[] = await this.findAllMessages(message.conv_id);
    return (messages);
  }

  async handleMessage(emission) {
    const message = emission.data
    const doesConvExists = await this.newConvService.findOneConversation(message.conv_id);
    if (doesConvExists) {
      const messRegistered: MessageEntity = {
        content: message.content,
        conv_id: message.conv_id,
        date: message.date,
        id: ++this.messId,
        login: emission.login,
        avatar: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.techtribune.net%2Fanime%2Fshrek-occupe-la-premiere-place-pour-lanime-sur-amazon%2F102182%2F&psig=AOvVaw20kB0wPmvDnlD_FTcqSOBO&ust=1640873495902000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJDgu66YifUCFQAAAAAdAAAAABAD'
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

}