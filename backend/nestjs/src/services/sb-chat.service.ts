import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConversationDto } from "src/dtos/conversation.dto";
import { MessageDto } from "src/dtos/messages.dto";
import { ChatterEntity } from "src/entities/eb-chatter.entity";
import { ConversationEntity } from "src/entities/eb-conversation.entity";
import { MessageEntity } from "src/entities/eb-message.entity";
import { Repository } from "typeorm";
import { GlobalDataService } from "./sb-global-data.service";

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
				private chatter: Repository<ChatterEntity>) {}

		async createConv(conv: ConversationDto): Promise<number | ConversationEntity | string> {
				console.log('Conversation creation');
				try {
						const isFind = await this.findOneConversation(this.convId + 1)
						if (!isFind) {
						this.convId++;
						conv.id = this.convId;
						await this.conversation.insert(conv);
						return (this.convId);
					}
					else
						return (isFind);
				}
				catch (error) {
					return `error.severity: ${error.severity}, 
		\     code: ${error.code},
		\     detail: ${error.detail}`;
				}
		}

    async createChatter(chatter: ChatterEntity): Promise<number | ChatterEntity | string> {
      console.log('Chatter creation');
      try {
          const isFind = await this.findOneChatter(chatter.conv_id, chatter.login)
          if (!isFind) {
          await this.chatter.insert(chatter);
          return (chatter);
        }
        else
          return (isFind);
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

		async findOneConversation(id: number) : Promise<any> {
			return this.conversation.findOne(id);
		}

    async findOneMessage(id: number) {
      return this.messages.find({id: id});
    }
		
    async findAllConv(login: string): Promise<Array<ConversationEntity>> {
      const chatterArray = (await this.chatter.find({
         join: {
          alias: "conv",
          leftJoinAndSelect: {
            conv_id: "conv.conv_id",
          }},
         where: {login: login},
      }));
      const convArray = new Array<ConversationEntity>();
      for (const chatter of chatterArray) {
        const convId = chatter.conv_id as any;
        const tmp  = await this.conversation.find({conv_id: convId.conv_id});
        if (tmp)
          convArray.push(...tmp);
      }
      return(convArray);
    }

		getUsersConnected(map: Map<string, Array<string>>) {
				const users: Array<string> = new Array<string>();
				
				if (!map.size)
						return (null);
				let it = map.keys();
				let tmp;
				while ((tmp = it.next().value) != undefined) {
						users.push(tmp);
				}
				return (users);
		}

		async findAllMessages(id: number) {
				return (this.messages.find({conv_id: id}));
		}


	async getReceiver(tabLogin: Set<string>, emitter: string): Promise<Array<string>> {
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
    console.log(message.conv_id);
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
    const doesConvExists = await this.findOneConversation(message.conv_id);
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