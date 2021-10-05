import { Controller, Get, Req, Res } from '@nestjs/common';
import { currentAccessToken } from 'src/app.controller';
import { ShrekEntity } from './shrek.entity';
import { ShrekTokenAccessService } from './shrek.service';

const request = require('request');
const axios = require('axios');
const querystring = require('querystring');
const https = require('https');

@Controller('shrek')
export class ShrekController {
  constructor(public shrek: ShrekTokenAccessService) {}
  @Get()
  async stratGame(@Req() req, @Res() res) {
    console.log(req.query);
    const code2 = req.query.code;
    const token_access = await axios.post(
      'https://api.intra.42.fr/oauth/token',
      querystring.stringify({
        grant_type: 'authorization_code',
        client_id:
          '4d5d28ff9d7de95a5193fdc23e41e968fb338bee441891bd99950308ef326a88',
        client_secret:
          '4236548f3e306db5d5d04bfbebb24ef6eef5da0d428cdf3350d45a8d92aecb6f',
        code: code2,
        redirect_uri: 'http://127.0.0.1:3000/shrek',
        state: 'enrfckqgilRbvr!XCWegret1@g30rt3h5/46+=40ethjr4j',
      }),
    );
    const theRes = await axios.get('https://api.intra.42.fr/v2/me', {
      headers: { Authorization: `Bearer ${token_access.data.access_token}` },
    });
    console.log("i go throught here");
    res.send(theRes.data);
  }
}
