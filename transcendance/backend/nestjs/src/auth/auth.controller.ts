import { BadRequestException, Controller, Get, Next, Req, Res } from '@nestjs/common';
import { WebAppUserService } from 'src/entity/webAppUser/webAppUser.service';
import { AuthService } from './auth.service';
export const passport = require('passport');
const FortyTwoStrategy = require('passport-42').Strategy;
const axios = require('axios');


const FORTYTWO_APP_ID = '4d5d28ff9d7de95a5193fdc23e41e968fb338bee441891bd99950308ef326a88';
const FORTYTWO_APP_SECRET = '4236548f3e306db5d5d04bfbebb24ef6eef5da0d428cdf3350d45a8d92aecb6f';

passport.use(new FortyTwoStrategy({
    clientID: FORTYTWO_APP_ID,
    clientSecret: FORTYTWO_APP_SECRET,
    callbackURL: "http://127.0.0.1:3000/callback"
  },
  async function() {
    console.log('this is the callback function in fortytwotartegy');
  }
  ));

@Controller('auth')
export class AuthController {

  private authService: AuthService;
  private userService: WebAppUserService;
  constructor (){}
  // constructor(private authService: AuthService, private userService: WebAppUserService){}

    @Get()
    async redirection(@Req() req, @Res() res) {
      console.log("redirection shrek:3000");
      const codeUrl = req.query.code;
      console.log(codeUrl);
      try {
        let theRes2;
        console.log(this.authService);
        const theRes = await this.authService.getLogInfo(codeUrl, res);
        if (theRes2 = await this.authService.registerData(theRes?.data, this.userService) === 'ok')
          res.send(theRes?.data)
        else
          this.authService.failLog(theRes2, res);
        return 'ok';
      }
      catch (error) {
          this.authService.failLog(error, res);
          return 'fail';
      }
    }
  
    @Get('login')
    async login(@Req() req, @Res() res, @Next() next)
    {
      console.log('login');
      console.log(req.data);
      const authRes = await passport.authenticate('42', function(err, user, info) {
        console.log('this is  an error');
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.redirect('/users/' + user.username);
        });
      })(req, res, next);
    }
}
