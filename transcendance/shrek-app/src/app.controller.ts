import { Controller, Get, Req, Res } from '@nestjs/common';
const axios = require('axios')
const querystring = require('querystring');
const FORTYTWO_APP_ID = '4d5d28ff9d7de95a5193fdc23e41e968fb338bee441891bd99950308ef326a88';
const FORTYTWO_APP_SECRET = '4236548f3e306db5d5d04bfbebb24ef6eef5da0d428cdf3350d45a8d92aecb6f';

@Controller()
export class AppController {

  @Get()
  async redirection(@Req() req, @Res() res) {
    console.log("redirection shrek:3000");
    const codeUrl = req.query.code;
    // const codeUrl = '6aa8d72fc36d6397f727e638e9491554b5e0085834f190873fdf637d919bb57e';
    console.log(codeUrl);
    try {
      const token_access = await axios.post(
        'https://api.intra.42.fr/oauth/token',
        querystring.stringify({
          grant_type: 'authorization_code',
          client_id:
            '4d5d28ff9d7de95a5193fdc23e41e968fb338bee441891bd99950308ef326a88',
          client_secret:
            '4236548f3e306db5d5d04bfbebb24ef6eef5da0d428cdf3350d45a8d92aecb6f',
          code: codeUrl,
          redirect_uri: 'http://127.0.0.1:5000/auth/',
          state: 'enrfckqgilRbvr!XCWegret1@g30rt3h5/46+=40ethjr4j',
        }),
      );
      console.log('post sended');
      const theRes = await axios.get('https://api.intra.42.fr/v2/me', {
      headers: { Authorization: `Bearer ${token_access.data.access_token}` },
    });
    res.send(theRes.data);
    return;
    }
    catch (error) {
      console.log('error')
      console.log(error);
      res.status(500)
      res.send('this is a fail')
      return;
    }
    
    // const client_id=FORTYTWO_APP_ID;
    // const redirect_uri="http://127.0.0.1:5000/";
    // const response_type="code";
    // const url="https://api.intra.42.fr/oauth/authorize";
    // const resFinal = await axios.get(url, {params: {
    //       client_id: client_id,
    //       redirect_uri: redirect_uri,
    //       response_type: response_type,
    //     }, 
    //   headers: {'Access-Control-Allow-Origin': '*'}});
    // console.log(resFinal);
    // const final = await axios.get('https://api.thecatapi.com/v1/images/search');
    // console.log(final.data)
    // res.send(final.data);
    // res.redirect('/auth/login');
    // res.redirect('https://api.intra.42.fr/oauth/authorize?\
    // client_id=4d5d28ff9d7de95a5193fdc23e41e968fb338bee441891bd99950308ef326a88&\
    // redirect_uri=http://127.0.0.1:3000/callback&response_type=code&scope=public&state=aaabbb');
    // res.redirect(request)
    // return('it works')

  }
}
