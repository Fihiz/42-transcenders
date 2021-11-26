import { Controller, Get, Req, Res } from '@nestjs/common';
import { AuthService } from 'src/services/sb-auth.service';

@Controller('auth')
export class AuthController {

    // constructor(private authService: AuthService, private userService: WebAppUserService, private apiUserService: ApiUserDataService){}


    constructor(private authService: AuthService) {}

  @Get()
  async redirection(@Req() req, @Res() res) {
    //   console.log("reached the back");
    //   res.send({status: 'OK auth back'});
    const codeUrl = req.query.code;
    try {
        const theRes = await this.authService.getLogInfo(codeUrl, res);
        res.send({
            data: theRes.data,
            status: 'OK auth back'
        });
    }
    catch (error) {
        console.log(error);
    }


    // const codeUrl = req.query.code;
    // try {
    //   const theRes = await this.authService.getLogInfo(codeUrl, res);
    //   const theRes2 = await this.authService.registerData(theRes?.data, this.userService, this.apiUserService)
    //   if ( theRes2 === 'ok')
    //     res.send({data: theRes.data, status: 'OK'});
    //   else if (theRes2 === 'ac')
    //     res.send({data: theRes.data, status: 'AC'});
    //   else
    //     return (this.authService.failLog(res));
    // }
    // catch (error) {
    //     console.log(error);
    //     return (this.authService.failLog(res));
    // }
  }

}
