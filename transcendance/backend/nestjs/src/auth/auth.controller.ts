import { Controller, Get, Next, Req, Res } from '@nestjs/common';
import { ApiUserDataService } from 'src/database/entities/apiUserData/apiUserData.service';
import { WebAppUserService } from 'src/database/entities/webAppUser/webAppUser.service';

import { AuthService } from './auth.service';
export const passport = require('passport');
const FortyTwoStrategy = require('passport-42').Strategy;


const FORTYTWO_APP_ID = '4d5d28ff9d7de95a5193fdc23e41e968fb338bee441891bd99950308ef326a88';
const FORTYTWO_APP_SECRET = '4236548f3e306db5d5d04bfbebb24ef6eef5da0d428cdf3350d45a8d92aecb6f';

passport.use(new FortyTwoStrategy({
    clientID: FORTYTWO_APP_ID,
    clientSecret: FORTYTWO_APP_SECRET,
    callbackURL: "http://127.0.0.1:3000/callback"
  },
  async () => console.log('this is the callback function in fortyTwoStrategy')));

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService, private userService: WebAppUserService, private apiUserService: ApiUserDataService){}

  @Get()
  async redirection(@Req() req, @Res() res) {
    const codeUrl = req.query.code;
    try {
      const theRes = await this.authService.getLogInfo(codeUrl, res);
      const theRes2 = await this.authService.registerData(theRes?.data, this.userService, this.apiUserService)
      if ( theRes2 === 'ok')
        res.send({data: theRes.data, status: 'OK'});
      else if (theRes2 === 'ac')
        res.send({data: theRes.data, status: 'AC'});
      else
        return (this.authService.failLog(res));
    }
    catch (error) {
        console.log(error);
        return (this.authService.failLog(res));
    }
  }
}
