import { Controller, Get } from '@nestjs/common';
import { getRepository, getTreeRepository, Timestamp } from 'typeorm';
import { webAppUserService } from './entity/webAppUser/webAppUser.service';
import { role, WebAppUser } from './entity/webAppUser/webAppUser.entity';
import { StatService } from './entity/Stat/stat.service';
import { StatEntity } from './entity/Stat/stat.entity';
import { RouterModule } from '@nestjs/core';


@Controller()
export class AppController {

  constructor (private userService: webAppUserService, private statService: StatService){}
  user: WebAppUser = {
    login: "test",
    pseudo: "testps",
    avatar: "",
    status: "ok",
    bio: "",
    pending_queue: false,
    banned: false,
    admonishement: 1,
    app_role: role.Admin,
    created: new Date(),
    updated: new Date(),
  };

  user2: WebAppUser = {
      login: "test222",
      pseudo: "testps2",
      avatar: "",
      status: "ok",
      bio: "",
      pending_queue: false,
      banned: false,
      admonishement: 1,
      app_role: role.Owner,
      created: new Date(),
      updated: new Date()
    };

  stat: StatEntity = {
    adversary_points: 0,
    highest_score: 0,
    longest_match: 0,
    loss: 0,
    match_number: 0,
    point_for_ladder: 0,
    score_points: 0,
    shortest_match: 0,
    victory: 0,
    worst_score: 0,
    login: this.user.login,
    created: new Date(),
    updated: new Date(),
  }


  @Get('modifie')
  async modifie() {
    const user = await getRepository(WebAppUser)
    .createQueryBuilder()
    .update(WebAppUser)
    .set({pseudo: "testPseudo"})
    .where("login = :test", {test: "test"})
    .execute();
  }

  @Get('getInfo')
  async getInfo() {
    const user1 = await getRepository(StatEntity)
    .find({relations: ["login"]});
    console.log(user1);
  }

  @Get()
  async welcome()
  {
   const res =  await this.userService.create(this.user);
   console.log(res);
    // this.user.login = "2test2";
    // console.log(this.user);
    // await this.userService.create(this.user2);
    
    // await this.statService.create(this.stat);
    // await this.statService.create(this.stat2);
    // await this.userService.update(3, this.user2); 


    // const users = await connection
    // .getRepository(User)

    // .createQueryBuilder("user")
    // .leftJoinAndSelect("user", "login")
    // .getMany();
    
    return ('welcome');
  }
  
}
