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
              '4d5d28ff9d7de95a5193fdc23e41e968fb338bee441891bd99950308ef326a88',
            client_secret:
              '4236548f3e306db5d5d04bfbebb24ef6eef5da0d428cdf3350d45a8d92aecb6f',
            code: codeUrl,
            redirect_uri: 'http://127.0.0.1:80/auth/',
            state: 'enrfckqgilRbvr!XCWegret1@g30rt3h5/46+=40ethjr4j',
          }));
        return(token_access);
      }

      async getLogInfo(codeUrl) {
        const accessToken = await this.getAccessToken(codeUrl);
          const theRes = await axios.get('https://api.intra.42.fr/v2/me', {
            headers: { Authorization: `Bearer ${accessToken.data.access_token}` },
          });
        console.log(`hello ${theRes.data.login}\nYour password is : ******************`);
        return (theRes);
      }
}
