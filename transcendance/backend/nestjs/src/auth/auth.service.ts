import { Res } from "@nestjs/common";
import axios from "axios";
import { role, WebAppUser } from "src/entity/webAppUser/webAppUser.entity";
import { webAppUserService } from "src/entity/webAppUser/webAppUser.service";
import { consumers } from "stream";
import { Repository, Timestamp } from "typeorm";
const querystring = require('querystring');

export class AuthService {

    constructor(){}

    failLog(error, res) {
      console.log(error)
      res.status(500)
      res.send('this is a fail')
    }

    async registerData(data, userData: webAppUserService) {
      let res;
      const user: WebAppUser = {
        login: data.login,
        pseudo: data.login,
        avatar: "",
        status: "connected",
        bio: "need to be written",
        pending_queue: false,
        banned: false,
        admonishement: 0,
        app_role: role.User,
        created: new Date(),
        updated: new Date(),
      };
      console.log(new Date().getTime())
      if (res = await userData.create(user) === 'ok')
        return('ok');
      else
        return(res);
    }

    async getLogInfo(codeUrl, @Res() res) {
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
            }),
          );
          console.log('post sended');
          const theRes = await axios.get('https://api.intra.42.fr/v2/me', {
          headers: { Authorization: `Bearer ${token_access.data.access_token}` },
        });
        console.log(`hello ${theRes.data.login}`);
        return (theRes);
    }
};