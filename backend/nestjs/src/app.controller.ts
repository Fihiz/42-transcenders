import { Controller, Get } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { webAppUserService } from './entity/webAppUser/webAppUser.service';
import { WebAppUser } from './entity/webAppUser/webAppUser.entity';


@Controller()
export class AppController {

  constructor (private userService: webAppUserService){}
  user: WebAppUser = {
    login: "test",
    pseudo: "testps",
    avatar: "",
    status: "ok",
    bio: "",
    pending_queue: false,
    banned: false,
    admonishement: 1,
    app_role: "leader",
  };

  user2: WebAppUser = {
      login: "test222",
      pseudo: "testps",
      avatar: "",
      status: "ok",
      bio: "",
      pending_queue: false,
      banned: false,
      admonishement: 1,
      app_role: "leader",
    };

  @Get()
  async welcome()
  {
    await this.userService.create(this.user);
    this.user.login = "2test2";
    // console.log(this.user);
    await this.userService.create(this.user);
    // await this.userService.update(3, this.user2); 
    const user = await getRepository(WebAppUser)
    .createQueryBuilder()
    .update(WebAppUser)
    .set({pseudo: "testPseudo"})
    .where("login = :test", {test: "test"})
    .execute();
    console.log(user);
    return ('welcome');
  }
  
}
