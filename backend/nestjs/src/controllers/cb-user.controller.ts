import { Controller, Get, Param, Response } from '@nestjs/common';
import { PongGameEntity } from 'src/entities/eb-pong-game.entity';
import { WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';
import { UserService } from 'src/services/sb-user.service';

@Controller('cb-user')
export class UserController {
    constructor(private userService: UserService) {}

	@Get('profile/:login')
	async getProfileByLogin(@Param('login') login: string, @Response() res): Promise<WebAppUserEntity> {
		const profile: WebAppUserEntity = await this.userService.findOneWebAppUser(login);
		res.send(profile);
		return profile;
	}

    // will be used later to update our user
}
