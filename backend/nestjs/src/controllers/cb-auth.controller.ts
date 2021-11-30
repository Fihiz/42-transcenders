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
            const userApiInfos = await this.authService.getInfosFromApi(codeUrl);
            const areDataRegistered = await this.authService.registerInfosInDatabase(userApiInfos?.data, this.userService, resp);

            const allUserInfos =  await this.userService.findOneApiUser(userApiInfos.data.login);

            console.log("On recupere les infos de notre login dans la db", allUserInfos);

            if ( areDataRegistered === 'Successfully created')
              resp.send({data: allUserInfos, status: 'OK'});
            else if (areDataRegistered === 'Already created')
              resp.send({data: allUserInfos, status: 'AC'});
            else
              return (this.authService.failLog(resp));
          }
        catch (error) {
            console.log(error);
        }
    }
}
