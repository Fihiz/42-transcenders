import { Server } from "socket.io";
import { Injectable } from "@nestjs/common";
import { MessageDto } from "src/dtos/createUser.dto";

@Injectable()
export class ChatService {
//   static id: number = 1;

//   messageData: Array<MessageDto> = [];
//   constructor(
//     private chatterService: ChatterService,
//     private convService: ConversationService,
//     private messageService: MessageService,
//     private webAppUser: WebAppUserService,
//     ){}
  
//   async check_conv(message: MessageDto): Promise<boolean> {
//     let ret = true;
//     if (!message.login || !(await this.webAppUser.findOne(message.login))) ret = false;
//     for (const to of message.to) if (!(await this.webAppUser.findOne(to))) ret = false;
//     return ret;
//   }

//   async chatterCreation(message: MessageDto) {
//     const res = await this.chatterService.create({
//       chat_role: 'admin',
//       conv_id: message.conv_id,
//       created: new Date(),
//       is_present: 'yes',
//       login: message.login,
//       muted_until: new Date(),
//       updated: new Date(),
//     });
//     const resb = await this.chatterService.create({
//       chat_role: 'admin',
//       conv_id: message.conv_id,
//       created: new Date(),
//       is_present: 'yes',
//       login: message.to[0],
//       muted_until: new Date(),
//       updated: new Date(),
//     });
//     if ( resb !== 'ok' && resb != 'ac' && res !== 'ok' && res != 'ac')
//       return ('error');
//     return ('ok');
//   }

//   async convCreation(message: MessageDto) {
//     ChatService.id++;
//     if (await this.convService.create({
//       conv_id: message.conv_id,
//       created: new Date(),
//       password: null,
//       room_name: message.login + '-' + message.to + message.conv_id.toString(),
//       room_type: 'private',
//       updated: new Date(),
//       to: message.to,
//       emitter: message.login,
//     }) !== 'ok')
//       return ('error');
//   }

//   async messageCreation(message: MessageDto) {
//     const creation = await this.messageService.create({
//       content: message.body,
//       conv_id: message.conv_id,
//       date: new Date(),
//       id: message.id,
//       login: message.login,
//     });
//     ChatService.id++;
//     return creation !== 'ok'? 'error' : 'ok';
//   }

//   async noConv(message: MessageDto) {
//     if (! await this.webAppUser.findOne(message.to[0])) return ('not found');
//     if (await this.convCreation(message) === 'error' ||
//         await this.messageCreation(message) === 'error' ||
//         await this.chatterCreation(message) === 'error')
//         return ('error');
//     return ('ok');
//   }

//   async getReceiver(tabLogin: Set<string>, emitter: string): Promise<Array<string>> {
//     const tabReceiver: Array<string> = [];
//     tabLogin.forEach(login => {
//       Data.loginIdMap.get(login)?.forEach(id => {
//         tabReceiver.push(id);
//       })
//     })
//     Data.loginIdMap.get(emitter).forEach(id => {
//       tabReceiver.push(id);
//     })
//     return (tabReceiver);
//   }

//   async conv(message: MessageDto) {
//     const tabLogin: Set<string> = new Set([]);
//     if (await this.messageCreation(message) !== 'ok') return (null);
//     let chatter = (await this.chatterService.findAll(message.conv_id));
//     if (chatter.length === 0) {
//       if (await this.messageCreation(message) === 'error' ||
//           await this.chatterCreation(message) === 'error')
//             return(null);
//       chatter = (await this.chatterService.findAll(message.conv_id));
//     }
//     console.log('chatter = ', chatter);
//     chatter.forEach(chatter => {
//       const tmp = chatter.login as unknown as WebAppUserEntity;
//       tabLogin.add(tmp.login);
//     });
//     return (await this.getReceiver(tabLogin, message.login));
//   }

//   errorMessage(server: Server, message: MessageDto): void {
//     const errorMess: MessageDto = {
//         conv_id: 0,
//         date: new Date(),
//         id: message.id as string,
//         login: message.login as string,
//         body: 'error in contact',
//         to: ['sender'],
//       }
//     this.messageData.push(errorMess);
//     server.to(errorMess.id).emit('errorMessage', this.messageData);
//     this.messageData.pop();
//   }

//   async getMessage(message: MessageDto) {
//     console.log(message.conv_id);
//     const messages: MessageEntity[] = await this.messageService.findAll(message.conv_id);
//     const finalMessages: MessageDto[] = [];
//     for (const mess of messages) {
//       const tmp: MessageDto = {
//         id: mess.id,
//         body: mess.content,
//         conv_id: mess.conv_id,
//         date: mess.date,
//         login: mess.login,
//         to: message.to,
//       };
//       finalMessages.push(tmp);
//     }
//     return (finalMessages);
//   }

//   async handleMessage(server:Server, message: MessageDto): Promise<void> {
//     console.log("message to =====>>>>>>>>> ", message.to, 'message from ========>>>>>>', message.login);
//     if ((await this.check_conv(message))) {
//       console.log('conv_id = ', message.conv_id);
//       // if (!(await this.convService.findOne(message.conv_id))) { // ne passe jamais la car creer avant
//       //   console.log(' >>>>>>>> 12');
//       //   if (await this.noConv(message) === 'error') this.errorMessage(server, message);
//       //   else {
//       //     console.log(' >>>>>>>> 1');
//       //     const tabReceiver: Array<string> = Data.loginIdMap.get(message.login);
//       //     this.messageData = await this.getMessage(message);
//       //     Data.loginIdMap.get(message.to[0])?.forEach(id =>  tabReceiver.push(id));
//       //     console.log('tabReciever = ', tabReceiver);
//       //     server.to(tabReceiver).emit('message', this.messageData);
//       //   }
//       // }
//       // else {
//         console.log(' >>>>>>>> 2');
//         const Receiver = await this.conv(message);
//         if (Receiver === null) this.errorMessage(server, message);
//         else {
//           console.log('receiv = ', Receiver);
//           this.messageData = await this.getMessage(message);
//           server.to(Receiver).emit('message', this.messageData);
//         }
//       // }
//     }
//     else {
//       console.log('error in format');
//       this.errorMessage(server, message);
//     }
  }