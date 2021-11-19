import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { WebAppUserEntity } from './database/entities/webAppUser/webAppUser.entity';
import { WebAppUserService } from './database/entities/webAppUser/webAppUser.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private webAppUserService: WebAppUserService ) {}
  // @Headers('Access-Control-Allow-Origin', '*')
    // getUser() : User {
    //   return this.userService.getUser();
    // }
  @Get("users")
    getWebAppUsers () : Promise<WebAppUserEntity[]> {
      console.log("ici le webappuser");
      const res = this.webAppUserService.findAll();
      console.log("Our result:", res);
      return(res);
    }
  @Get("user")
    getWebAppUser () : Promise<WebAppUserEntity> {
      console.log("ici le webappuser");
      const res = this.webAppUserService.findOne("Moldu_01");
      console.log("Our result:", res);
      return(res);
    }
}
