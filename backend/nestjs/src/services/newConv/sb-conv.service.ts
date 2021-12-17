import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ChatterEntity } from "src/entities/eb-chatter.entity";
import { ConversationEntity } from "src/entities/eb-conversation.entity";
import { Repository } from "typeorm";


@Injectable()
export class ConvService {

  private convId;

  constructor( @InjectRepository(ConversationEntity)
                private conversation: Repository<ConversationEntity>,
                @InjectRepository(ChatterEntity)
                private chatter: Repository<ChatterEntity>){}


  async createConv(conv: ConversationEntity) {
    const result = {
      success: true,
      data: {},
    }
      console.log('Conversation creation');
      try {
        // const isFind = await this.findOneConversation(this.convId + 1)
        // if (!isFind) {
          let newConversation;
          if  (newConversation = await this.conversation.insert(conv)) {
            result.data  = newConversation
            return (result);
          }
          else
            throw 'error in insert';
        // }
        // else {
          // result.success = false;
          // result.data = isFind;
          // return (result);
        // }
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
}