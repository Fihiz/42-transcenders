import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ChatterEntity } from "src/entities/eb-chatter.entity";
import { ConversationEntity } from "src/entities/eb-conversation.entity";
import { Repository } from "typeorm";
import { UserService } from "../sb-user.service";


@Injectable()
export class ConvService {

  private convId;

  constructor( @InjectRepository(ConversationEntity)
                private conversation: Repository<ConversationEntity>,
                @InjectRepository(ChatterEntity)
                private chatter: Repository<ChatterEntity>,
                private user: UserService){}


  async newConvcheckValue (conv: ConversationEntity) {
    if (conv.members.length === 0 || conv.name.length === 0)
      return (false);
      else if (this.conversation.findOne(conv.name))
      return (false);
    for (const mem of conv.members){
      if (!(await this.user.findOneApiUser(mem)))
        return (false)
    }
    return (true);
  }

  async createConv(conv: ConversationEntity) {
    const result = {
      success: true,
      data: {},
    }
      console.log('Conversation creation');
      try {
          let newConversation;
          newConversation = await this.conversation.insert(conv)
          result.data  = newConversation
          return (result);
      }
      catch (error) {
        result.data = `error.severity: ${error.severity}, 
        \     code: ${error.code},
        \     detail: ${error.detail}`
        result.success = false;
        return (result);
      }
  }

  async findOneConversation(id: number) : Promise<any> {
		return this.conversation.findOne(id);
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

  joinRoomCheckValue(emission, conv: ConversationEntity) {
    if (!conv || conv?.members?.find(member => member === emission.login) || conv.type === 'private')
      return (false);
    else if (conv.type === 'protected' && emission.data.roomPassword != conv.password)
      return (false);
    else if (conv.members.find(member => member === emission.login))
      return (false)
    return (true);
  }

	async joinRoom(emission) {
		let conv = await this.conversation.findOne({where: {name: emission.data.roomName}})
    console.log('conv = ', conv);
    if (this.joinRoomCheckValue(emission, conv) === false)
      return (undefined)
		await this.conversation.update({name: emission.data.roomName}, {members: [emission.login, ...conv.members]});
		conv = await this.conversation.findOne({where: {name: emission.data.roomName}})
		await this.chatter.insert({
			chat_role: "player",
			conv_id: conv.conv_id,
			is_present: "yes",
			login: emission.login,
			muted_until: new Date(),
		});
		return (conv);
	}
}