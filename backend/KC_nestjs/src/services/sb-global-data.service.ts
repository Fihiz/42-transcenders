import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalDataService {
    static loginIdMap: Map<string, Array<string>> = new Map<string, Array<string>>();
}

//possible de faire une interface plus tard
export class Message {
    id:any = "id";
    conv_id: number = 0;
    login: string = "login";
    date: Date = new Date();
    body:string = "body";
    to: Array<string> = [];
  }
  
