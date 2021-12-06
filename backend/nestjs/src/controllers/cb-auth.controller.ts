import { Body, Controller, Get, Req, Res, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { AuthService } from 'src/services/sb-auth.service';
import { UserService } from 'src/services/sb-user.service';

@Controller('cb-auth')
export class AuthController {

    constructor(private authService: AuthService,
                private userService: UserService) {}

    @Get()
    async redirection(@Req() req, @Res() resp) {
        const codeUrl = req.query.code;
        try {
            const userApiInfos = await this.authService.getInfosFromApi(codeUrl);
            if (!userApiInfos) {
                resp.send({data: "error"});
                return ;
            }
            const allUserInfos =  await this.userService.findOneApiUser(userApiInfos.data.login);
            console.log('1');
            if (allUserInfos === undefined)
            {
              resp.send({data: userApiInfos.data, isFound: 'not found'});
              return ;
              // on invite le user a rentrer ses infos de premiere fois et l'enregistrer (pseudo -> ne doit pas deja exister, biom avatar)
            }
            else {
                resp.send({data: allUserInfos, isFound: 'found'});
            }
          }
        catch (error) {
            console.log(error.response.data);
            console.log('fail redirection');
            // resp.send('error');
        }
    }


    @Post('registerData')
    async registerdata(@Req() req, @Res() res, @Body('data') createUserDto: CreateUserDto) {
        console.log('createUserdto = ', createUserDto);
        const areDataRegistered = await this.userService.registerInfosInDatabase(createUserDto, this.userService, res);
        res.send(areDataRegistered);
    }
}
