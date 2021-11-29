import { Controller, Get, Req, Res } from '@nestjs/common';
import { AuthService } from 'src/services/sb-auth.service';
import { UserService } from 'src/services/sb-user.service';

@Controller('cb-auth')
export class AuthController {

    constructor(private authService: AuthService, private userService: UserService) {}

    @Get()
    async redirection(@Req() req, @Res() resp) {
        const codeUrl = req.query.code;
        try {
            const userInfo = await this.authService.getLogInfo(codeUrl);
            const areDataRegistered = await this.authService.registerData(userInfo?.data, this.userService, resp);
            if ( areDataRegistered === 'ok')
              resp.send({data: userInfo.data, status: 'OK'});
            else if (areDataRegistered === 'ac')
              resp.send({data: userInfo.data, status: 'AC'});
            else
              return (this.authService.failLog(resp));
          }
        catch (error) {
            console.log(error);
        }
    }
}
