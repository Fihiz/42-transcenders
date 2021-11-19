import { Server } from "socket.io";
import { Data, Message } from "src/app.service";
import { ChatterService } from "src/database/entities/chatter/chatter.service";
import { MessageService } from "src/database/entities/message/message.service";
import { ConversationService } from "src/database/entities/conversation/conversation.service";
import { WebAppUserService } from "src/database/entities/webAppUser/webAppUser.service";
import { Injectable } from "@nestjs/common";
import { WebAppUserEntity } from "src/database/entities/webAppUser/webAppUser.entity";

@Injectable()
export class ChatService {
  static id: number = 1;

  messageData: Array<Message> = [];
  constructor(
    private chatterService: ChatterService,
    private convService: ConversationService,
    private messageService: MessageService,
    private webAppUser: WebAppUserService,
    ){}
  
  async check_conv(message: Message): Promise<boolean> {
    return ((await this.chatterService.findAll(message.conv_id)).length == 0 ? false : true);
  }

  async chatterCreation(message: Message) {
    const res = await this.chatterService.create({
      chat_role: 'admin',
      conv_id: message.conv_id,
      created: new Date(),
      is_present: 'yes',
      login: message.login,
      muted_until: new Date(),
      updated: new Date(),
    });
    const resb = await this.chatterService.create({
      chat_role: 'admin',
      conv_id: message.conv_id,
      created: new Date(),
      is_present: 'yes',
      login: message.to[0],
      muted_until: new Date(),
      updated: new Date(),
    });
    // console.log('chatter res = ', res, resb);
    if ( resb !== 'ok' && resb != 'ac' && res !== 'ok' && res != 'ac')
      return ('error');
    return ('ok');
  }

  async convCreation(message: Message) {
    ChatService.id++;
    if (await this.convService.create({
      conv_id: message.conv_id,
      created: new Date(),
      password: null,
      room_name: message.login + '-' + message.to + message.conv_id.toString(),
      room_type: 'private',
      updated: new Date(),
    }) !== 'ok')
      return ('error');
  }

  async messageCreation(message: Message) {
    const creation = await this.messageService.create({
      content: message.body,
      conv_id: message.conv_id,
      date: new Date(),
      id: message.id,
      login: message.login,
    });
    ChatService.id++;
    // console.log('creation = ', creation);
    return creation !== 'ok'? 'error' : 'ok';
  }

  async noConv(message: Message) {
    if (! await this.webAppUser.findOne(message.to[0])) return ('not found');
    if (await this.convCreation(message) === 'error' ||
        await this.messageCreation(message) === 'error' ||
        await this.chatterCreation(message) === 'error')
        return ('error');
    return ('ok');
  }

  async getReceiver(tabLogin: Set<string>): Promise<Array<string>> {
    const tabReceiver: Array<string> = [];
    // console.log(tabLogin)
    tabLogin.forEach(login => {
      Data.loginIdMap.get(login)?.forEach(id => {
        tabReceiver.push(id);
      })
    })
    return (tabReceiver);
  }

  async conv(message: Message) {
    const tabLogin: Set<string> = new Set([]);
    if (await this.messageCreation(message) !== 'ok') return (null);
    console.log('before');
    const chatter = (await this.chatterService.findAll(message.conv_id));
    chatter.forEach(chatter => {
      const tmp = chatter.login as unknown as WebAppUserEntity;
      tabLogin.add(tmp.login);
    });
    return (await this.getReceiver(tabLogin));
  }

  errorMessage(server: Server, message: Message): void {
    const errorMess: Message = {
        conv_id: 0,
        date: new Date(),
        id: message.id as string,
        login: message.login as string,
        body: 'error in contact',
        to: ['sender'],
      }
      this.messageData.push(errorMess);
    server.to(errorMess.id).emit('errorMessage', this.messageData);
    this.messageData.pop();
  }

  async handleMessage(server:Server, message: Message): Promise<void> {
    if (message.to && message.login && message.conv_id) {
      // console.log(message);
      // console.log('y a t il une conv? == ', await this.convService.findOne(message.conv_id));
      if (! (await this.convService.findOne(message.conv_id))) {
        if (await this.noConv(message) === 'error') this.errorMessage(server, message);
        else {
          const tabReceiver: Array<string> = Data.loginIdMap.get(message.login);
          this.messageData.push(message);
          Data.loginIdMap.get(message.to[0])?.forEach(id =>  tabReceiver.push(id));
          console.log('tabReciever = ', tabReceiver);
          server.to(tabReceiver).emit('message', this.messageData);
        }
      }
      else {
        const Receiver = await this.conv(message);
        if (Receiver === null) this.errorMessage(server, message);
        else {
          console.log(Receiver);
          this.messageData.push(message); // >>>>>>>>>>>>>>>aller chercher les messages dans la bdd et pas dans le vieux tableau
          server.to(Receiver).emit('message', this.messageData);
        }
      }
    }
    else {
      this.errorMessage(server, message);
    }
  }
}
