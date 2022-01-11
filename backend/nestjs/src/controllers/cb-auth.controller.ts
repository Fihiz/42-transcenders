import { Body, Controller, Get, Req, Res, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { AuthService } from 'src/services/sb-auth.service';
import { StatsService } from 'src/services/sb-stats.service';
import { UserService } from 'src/services/sb-user.service';

@Controller('cb-auth')
export class AuthController {

    constructor(private authService: AuthService,
                private userService: UserService,
                private statsService: StatsService) {}

    @Get()
    async redirection(@Req() req, @Res() resp) {
        const query = req.query;
        try {
            const userApiInfos = await this.authService.getInfosFromApi(query);
            if (!userApiInfos) {
                resp.send({data: "error"});
                return ;
            }
            const allUserInfos = await this.userService.findOneApiUser(userApiInfos.data.login);
            const allUserStats = await this.statsService.getStatsByLogin(userApiInfos.data.login);
            if (allUserInfos === undefined || allUserStats === undefined)
            {
              resp.send({data: userApiInfos.data, isFound: 'not found'});
              return ;
            }
            else {
                allUserInfos.avatar = allUserInfos.avatar.replace("localhost:3000", req.rawHeaders[req.rawHeaders.indexOf('Host') + 1]);
                resp.send({data: {...allUserInfos, points_for_ladder: allUserStats.points_for_ladder}, isFound: 'found'});
            }
          }
        catch (error) {
            console.log(error.response.data);
        }
    }


    @Post('registerData')
    async registerdata(@Req() req, @Res() res, @Body('data') createUserDto: CreateUserDto) {
        if (await this.userService.findPseudo(createUserDto.pseudo, undefined))
            res.send('pseudo already exists');
        const areDataRegistered = await this.userService.registerInfosInDatabase(createUserDto, res);
        const areStatsRegistered = await this.statsService.registerStatsInDatabase(createUserDto, res);
        if (areDataRegistered === areStatsRegistered &&
            (areStatsRegistered === "Already created" ||
            areStatsRegistered === "Successfully created"))
            res.send(areDataRegistered);
        else
            res.send('error');
    }
}
