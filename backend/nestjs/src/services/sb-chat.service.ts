import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { getRepository, Repository } from "typeorm";
import { ChatterEntity } from 'src/entities/eb-chatter.entity';
import { ConversationEntity } from 'src/entities/eb-conversation.entity';
import { MessageEntity } from 'src/entities/eb-message.entity';

@Injectable()
export class ChatService {

    // constructor(
    //     @InjectRepository(ChatterEntity)
    //     private Chatter: Repository<ChatterEntity>,
    //     @InjectRepository(ConversationEntity)
    //     private Conversation: Repository<ConversationEntity>,
    //     @InjectRepository(MessageEntity)
    //     private Message: Repository<MessageEntity>,
    //   ) {}


    //   async createChatter(user: ChatterEntity): Promise<any> {
    //     console.log('ChatterEntity creation');
    //     try {
    //       if (!(await this.Chatter.findOne(user.login))) {
    //         const res= await this.Chatter.insert(user);
    //         return 'ok';
    //       }
    //       else
    //         return('ac');
    //     }
    //     catch (error) {
    //       return `error.severity: ${error.severity}, 
    // \     code: ${error.code},
    // \     detail: ${error.detail}`;
    //     }
    //   }

    //   async createConversation(user: ConversationEntity): Promise<any> {
    //     console.log('ChatterEntity creation');
    //     try {
    //       if (!(await this.Conversation.findOne(user.conv_id))) {
    //         const res= await this.Conversation.insert(user);
    //         return 'ok';
    //       }
    //       else
    //         return('ac');
    //     }
    //     catch (error) {
    //       return `error.severity: ${error.severity}, 
    // \     code: ${error.code},
    // \     detail: ${error.detail}`;
    //     }
    //   }

    //   async createMessage(user: ChatterEntity): Promise<any> {
    //     console.log('ChatterEntity creation');
    //     try {
    //       if (!(await this.Message.findOne(user.login))) {
    //         const res= await this.Message.insert(user);
    //         return 'ok';
    //       }
    //       else
    //         return('ac');
    //     }
    //     catch (error) {
    //       return `error.severity: ${error.severity}, 
    // \     code: ${error.code},
    // \     detail: ${error.detail}`;
    //     }
    //   }
    
    //   findAllChatter() {
    //     return (this.Chatter.find());
    //   }

    //   findAllMessage() {
    //     return (this.Message.find());
    //   }

    //   findAllConversation() {
    //     return (this.Conversation.find());
    //   }
    
    //   findOneChatter(login: string) {
    //     return this.Chatter.findOne(login);
    //   }

    //   findOneMessage(login: string) {
    //     return this.Message.findOne(login);
    //   }

    //   findOneConversation(login: string) {
    //     return this.Conversation.findOne(login);
    //   }
    
    //   update(id: number, newUser: ChatterEntity) {
    //     return this.Chatter.update("test", newUser);
    //   }
    
    //   async remove(user: ChatterEntity) {
    //     console.log('deletion');
    //     return (await this.Chatter.delete(user));
    //   }
    
    //   async modifie(set1: object, where1: string, where2: object, entity) {
    //     const user = await getRepository(entity)
    //     .createQueryBuilder()
    //     .update(entity)
    //     .set(set1)
    //     .where(where1, where2)
    //     .execute();
    //   }

}

