import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalDataService {
    static loginIdMap: Map<string, {status: string, sockets: Array<{id: string, gameId: number}>}>
            = new Map<string, {status: string, sockets: Array<{id: string, gameId: number}>}>();
}

export class Message {
    id:any = "id";
    conv_id: number = 0;
    login: string = "login";
    date: Date = new Date();
    body:string = "body";
    to: Array<string> = [];
  }
  
