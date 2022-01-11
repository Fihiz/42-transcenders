import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ChatterEntity } from "src/entities/eb-chatter.entity";
import { ConversationEntity } from "src/entities/eb-conversation.entity";
import { MessageEntity } from "src/entities/eb-message.entity";
import { role } from "src/entities/eb-web-app-user.entity";
import { Repository } from "typeorm";
import { ChatService } from "./sb-chat.service";
import { ChatterService } from "./sb-chatter.service";
import { ConvService } from "./sb-conv.service";

@Injectable()
export class AdminService {
  
  constructor(@InjectRepository(ConversationEntity)
  private conversation: Repository<ConversationEntity>,
  @InjectRepository(ChatterEntity)
  private chatter: Repository<ChatterEntity>,
  @InjectRepository(MessageEntity)
  private message: Repository<MessageEntity>,
  private chatService: ChatService,
  private chatterService: ChatterService){}

  findAllConvOfDb() {
    return (this.conversation.find());
  }

  async getChattersAndRoles() {
    const convs = await this.findAllConvOfDb();
    const rolesOfChatters: Array<Array<{login: string, role: string}>> = [];

    for (const conv of convs) {
      const tmp: Array<{login: string, role: string}> = [];
        for (const member of conv.members) {  
          const chatter = await this.chatter.findOne({where: {conv_id: conv.conv_id, login: member}});
          tmp.push({ login: member, role: chatter.chat_role });
        }
        rolesOfChatters.push(tmp);
    }
    return (rolesOfChatters);
  }

  
  async removeConv(conv: ConversationEntity) {

    try {
      const messages = await this.chatService.findAllMessages(conv.conv_id);
      console.log(messages);
      if (messages.length > 0) { 
        for (const message of messages) {
          await this.message.delete(message);
        }
      }
      const members = await this.chatterService.findAllChatters(conv.conv_id);
      if (members.length > 0) {
        for (const member of members) {
          await this.chatter.delete(member);
        }
      }
      await this.conversation.remove(conv);
      return ('ok')
    }
    catch (error) {
      console.error(error);
      return ('ko');
    }
  }
}