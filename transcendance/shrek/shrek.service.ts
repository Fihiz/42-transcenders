import { Injectable } from '@nestjs/common';
// import { config } from '../app.controller';
import { ClientCredentials, Token } from 'simple-oauth2';
import { get } from 'https';
const request = require('request');

@Injectable()
export class ShrekTokenAccessService {
  // async getToken(tokenAccess): Promise<Token> {
  //   const client = new ClientCredentials(config);

  //   if (tokenAccess && tokenAccess.expired()) {
  //     try {
  //       tokenAccess = await tokenAccess.refresh({
  //         scope: 'public',
  //       });
  //       return tokenAccess;
  //     } catch (error) {
  //       console.log('Error refreshing access token: ', error.message);
  //     }
  //   } else {
  //     try {
  //       tokenAccess = await client.getToken({ scope: 'public' });
  //       return tokenAccess;
  //     } catch (error) {
  //       console.log('Access Token error', error.message);
  //       return undefined;
  //     }
  //   }
  // }
  getID(tokenAccess) {
    const options = {
      url: 'https://api.intra.42.fr/oauth/token/info',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenAccess.token.access_token}`,
        ContentType: 'application/json',
      },
    };
    request(options, function (_, __, body) {
      let json = JSON.parse(body);
      console.log(json);
    });
  }
}
