import { Controller, Get, Req, Res } from '@nestjs/common';
import { AuthService } from 'src/services/sb-auth.service';
import { UserService } from 'src/services/sb-user.service';


@Controller('cb-auth')
export class AuthController {

    constructor(private authService: AuthService, private userService: UserService){}

    @Get()
    async redirection(@Req() req, @Res() res) {
      const codeUrl = req.query.code;
      try {
        const theRes = await this.authService.getLogInfo(codeUrl, res);
        const theRes2 = await this.authService.registerData(theRes?.data, this.userService)
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
