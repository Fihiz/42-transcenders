import { Server } from "socket.io";
import { Data, Message } from "src/app.service";
import { ChatterService } from "src/database/entities/chatter/chatter.service";
import { MessageService } from "src/database/entities/message/message.service";
import { ConversationService } from "src/database/entities/conversation/conversation.service";

export class ChatService {

  messageData: Array<Message> = [];
  constructor(
    private chatterService: ChatterService,
    private convService: ConversationService,
    private messageService: MessageService,
    ){}
  
  async check_conv(message: Message): Promise<boolean> {
    return ((await this.chatterService.findAll(message.conv_id)).length == 0 ? false : true);
  }

  async noConv(message: Message) {
    const id = 1;
    if (await this.convService.create({
      conv_id: id,
      created: new Date(),
      password: null,
      room_name: message.login + '-' + message.to,
      room_type: 'private',
      updated: new Date(),
    }) !== 'ok')
      return ('error');
    if (await this.messageService.create({
      content: message.body,
      conv_id: id,
      date: new Date(),
      id: 1,
      login: message.login,
    }) !== 'ok')
      return('error');
    if (!(await this.chatterService.findOne(0, message.login)))
      if (await this.chatterService.create({
        chat_role: 'admin',
        conv_id: id,
        created: new Date(),
        is_present: 'yes',
        login: message.login,
        muted_until: null,
        updated: new Date(),
      }) !== 'ok')
        return ('error');
    
  }

//   gestMessage(server: Server, message: Message) {
//     if (this.check_conv(message))
//     {
//       const conv: ConversationEntity = {
//         conv_id: 1,
//         created: new Date(),
//         password: null,
//         room_name: message.login + '-' + message.to,
//         room_type: 'private',
//         updated: new Date(),
//       };

//       this.conService.create(conv);
//   }
// }


  handleMessage(server: Server, message: Message): void {
    this.messageData.push(message);
    if (message.to && Data.loginIdMap.get(message.to))
      server.to(Data.loginIdMap.get(message.to)).to(message.id).emit('message', this.messageData);
    else {
      const errorMess: Message = {
        conv_id: 0,
        date: new Date(),
        id: message.id as string,
        login: message.login as string,
        body: 'error in contact',
        to: 'sender'
      }
      this.messageData.pop();
      this.messageData.push(errorMess);
      server.to(errorMess.id).emit('message', this.messageData);
    }
  }
}
