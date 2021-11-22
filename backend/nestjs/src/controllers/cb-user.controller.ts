import { Controller, Get } from '@nestjs/common';
import { WebAppUserEntity } from 'src/entities/eb-web-app-user.entity';
import { UserService } from 'src/services/sb-user.service';

@Controller('cb-user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    getWebAppUser () : Promise<WebAppUserEntity> {
      console.log("Ici le webappuser");
      const res = this.userService.findOne("Moldu_01");
      console.log("Our result:", res);
      return(res);
    }
}
