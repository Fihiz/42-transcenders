import { Injectable } from '@nestjs/common';
import { AuthorizationCode } from 'simple-oauth2';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

export class Data {
  static loginIdMap: Map<string, Array<string>> = new Map<string, Array<string>>();

  accessToken: '';
  config = {
    client: {
      id: '4d5d28ff9d7de95a5193fdc23e41e968fb338bee441891bd99950308ef326a88',
      secret:
        '4236548f3e306db5d5d04bfbebb24ef6eef5da0d428cdf3350d45a8d92aecb6f',
    },
    auth: {
      tokenHost: 'https://api.intra.42.fr/oauth/token/',
    },
  };
  client = new AuthorizationCode(this.config);
}

export class Message {
  login: string = "login";
  id:any = "id";
  body:string = "body";
  to: string = "room";
}
