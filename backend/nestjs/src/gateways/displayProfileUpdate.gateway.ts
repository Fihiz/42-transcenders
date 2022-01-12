import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway({cors:{origin: '*'}})

export class DisplayProfileUpdate {

  constructor(){}


  handleConncetion() {
  }
  @WebSocketServer()
  server;

}
