import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway({cors:{origin: '*'}})

export class DisplayProfileUpdate {

  constructor(){}


  @WebSocketServer()
  server;

}
