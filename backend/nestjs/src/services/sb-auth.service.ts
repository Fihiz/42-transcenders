// MERGE
// import { Injectable, Res, Session } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import axios from "axios";
const querystring = require('querystring');

@Injectable()
export class AuthService {

  async getAccessToken(query) {
    const token_access = await axios.post(
      'https://api.intra.42.fr/oauth/token',
      querystring.stringify({
        grant_type: 'authorization_code',
        client_id:
          'd13f8d3b287c4cb4ffa5e23f265383e2e33b4e0b0370efa35d0c36e3da0cb988',
        client_secret:
          '80e5523669ad5110af4a8e35a69b23b82790ed17ed225c3d528499b3f24da8b2',
        code: query.code,
        redirect_uri: `http://${query.host}:80/auth/`,
        state: 'enrfckqgilRbvr!XCWegret1@g30rt3h5/46+=40ethjr4j',
      }));
    return(token_access);
  }

  async getInfosFromApi(query) {
    try {
    const accessToken = await this.getAccessToken(query);
      const theRes = await axios.get('https://api.intra.42.fr/v2/me', {
        headers: { Authorization: `Bearer ${accessToken.data.access_token}`,
       },
      });
    return (theRes);
    }
    catch (error) {
      console.log('An error has occured in getInfoFromApi');
      return (undefined);
    }
  }
}
