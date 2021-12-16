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
        const query = req.query;
        try {
            const userApiInfos = await this.authService.getInfosFromApi(query);
            if (!userApiInfos) {
                resp.send({data: "error"});
                return ;
            }
            const allUserInfos =  await this.userService.findOneApiUser(userApiInfos.data.login);
            if (allUserInfos === undefined)
            {
              resp.send({data: userApiInfos.data, isFound: 'not found'});
              return ;
            }
            else {
                resp.send({data: allUserInfos, isFound: 'found'});
            }
          }
        catch (error) {
            console.log(error.response.data);
            console.log('fail redirection');
        }
    }


    @Post('registerData')
    async registerdata(@Req() req, @Res() res, @Body('data') createUserDto: CreateUserDto) {
        const areDataRegistered = await this.userService.registerInfosInDatabase(createUserDto, this.userService, res);
        res.send(areDataRegistered);
    }
}
