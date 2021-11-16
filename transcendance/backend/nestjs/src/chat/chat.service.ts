import { Server } from "socket.io";
import { Data, Message } from "src/app.service";

export class ChatService {

  messageData: Array<Message> = [];
  
  handleMessage(server: Server, message: Message): void {
    this.messageData.push(message);
    if (message.to && Data.loginIdMap.get(message.to))
      server.to(Data.loginIdMap.get(message.to)).to(message.id).emit('message', this.messageData);
    else {
      const errorMess: Message = {
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
