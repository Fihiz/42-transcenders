import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConversationDto } from "src/dtos/conversation.dto";
import { ConversationEntity } from "src/entities/eb-conversation.entity";
import { MessageEntity } from "src/entities/eb-message.entity";
import { Repository } from "typeorm";
import { GlobalDataService } from "./sb-global-data.service";

@Injectable()
export class ChatService {

		private convId: number = 0;

		constructor(
				@InjectRepository(MessageEntity)
				private messages: Repository<MessageEntity>,
				@InjectRepository(ConversationEntity)
				private conversation: Repository<ConversationEntity>) {}

		async createConv(conv: ConversationDto): Promise<number | ConversationEntity | string> {
				console.log('WepAppUser creation');
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

		async findOneConversation(id: number) : Promise<any> {
				return this.conversation.findOne(id);
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

		async getMessages(id: number) {
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

}