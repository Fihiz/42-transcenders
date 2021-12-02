import { Controller, Get, Req, Res } from '@nestjs/common';
import { AuthService } from 'src/services/sb-auth.service';
import { UserService } from 'src/services/sb-user.service';

// avec userService:
      // if (res.status == 'Already created')
      // on recup l'user
      // else if ('not exist yes')
      // on register les data apres avoir demande a l'user de fill ce qui nous manque et on recup l'user
      // const resData = res.data as unknown as any;
      // this.fillUser(resData);
      // this.router.navigate(['/welcome']); // Page for filling infos if first time

@Controller('cb-auth')
export class AuthController {

    constructor(private authService: AuthService, private userService: UserService) {}

    @Get()
    async redirection(@Req() req, @Res() resp) {
        const codeUrl = req.query.code;
        try {
            const userApiInfos = await this.authService.getInfosFromApi(codeUrl);
            // protéger si l'user autorise pas.
            const allUserInfos =  await this.userService.findOneApiUser(userApiInfos.data.login);
            console.log('allUserInfos :', allUserInfos);
            if (allUserInfos === undefined)
            {
              resp.send({data: userApiInfos.data, isFound: 'not found'});
              // on invite le user a rentrer ses infos de premiere fois et l'enregistrer (pseudo -> ne doit pas deja exister, biom avatar)
            }
            else
                resp.send({data: allUserInfos, isFound: 'found'});


            // move
            // const areDataRegistered = await this.authService.registerInfosInDatabase(userApiInfos?.data, this.userService, resp);

            // const allUserInfos =  await this.userService.findOneApiUser(userApiInfos.data.login);

            // console.log("on recupere les infos de notre login dans la db", allUserInfos);

            // if ( areDataRegistered === 'Successfully created')
            //   resp.send({data: allUserInfos, status: 'OK'});
            // else if (areDataRegistered === 'Already created')
            //   resp.send({data: allUserInfos, status: 'AC'});
            // else
            //   return (this.authService.failLog(resp));


          }
        catch (error) {
            console.log(error); /* Fail ? */
        }
    }
}
