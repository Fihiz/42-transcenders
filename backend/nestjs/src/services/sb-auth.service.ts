import { Injectable, Res } from '@nestjs/common';
import axios from "axios";
const querystring = require('querystring');

@Injectable()
export class AuthService {

  async getAccessToken(codeUrl) {
    const token_access = await axios.post(
      'https://api.intra.42.fr/oauth/token',
      querystring.stringify({
        grant_type: 'authorization_code',
        client_id:
          '433f62b085e15cdb9994c692a7fc5af7e43eb3ca173bae63a421b26fa176c29a',
        client_secret:
          '585363d4be02a1ddd9fbdfc2d1b96b29a3212d45ba0ffe4d6d6851fe5fd8bc65',
        code: codeUrl,
        redirect_uri: 'http://127.0.0.1:80/auth/',
        state: 'enrfckqgilRbvr!XCWegret1@g30rt3h5/46+=40ethjr4j',
      }));
    return(token_access);
  }

  async getInfosFromApi(codeUrl) {
    try {
    const accessToken = await this.getAccessToken(codeUrl);
      const theRes = await axios.get('https://api.intra.42.fr/v2/me', {
        headers: { Authorization: `Bearer ${accessToken.data.access_token}` },
      });
    console.log(`Hello ${theRes.data.login}\nYour password is : ******************`);
    return (theRes);
    }
    catch (error) {
      console.log('An error has occured in getInfoFromApi');
      return (undefined);
    }
  }





}
