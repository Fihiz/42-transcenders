import { Controller, Get, Next, Req, Res } from '@nestjs/common';
import { read } from 'fs';
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
  async function(accessToken, refreshToken, profile, cb) {
    const theRes = await axios.get('https://api.intra.42.fr/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    console.log(profile.username)
    console.log("this is the success")
    // return (profile);
  }));


@Controller('auth')
export class AuthController {
    @Get('failure')
    fail()
    {
      console.log('this is a fail');
      return ;
    }
    
    @Get('success')
    success()
    {
      console.log('this is a success');
      return ;
    }
  
    @Get('login')
    async login(@Req() req, @Res() res, @Next() next)
    {
      console.log('login');
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
