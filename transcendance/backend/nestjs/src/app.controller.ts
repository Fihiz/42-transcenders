import { Controller, Get } from '@nestjs/common';
import { getRepository} from 'typeorm';
import { WebAppUserService } from './entity/webAppUser/webAppUser.service';
import { WebAppUserEntity } from './entity/webAppUser/webAppUser.entity';
import { StatService } from './entity/Stat/stat.service';
import { StatEntity } from './entity/Stat/stat.entity';


@Controller()
export class AppController {

  constructor (private userService: WebAppUserService, private statService: StatService){}

  @Get('modifie')
  async modifie() {
    const user = await getRepository(WebAppUserEntity)
    .createQueryBuilder()
    .update(WebAppUserEntity)
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
    return ('welcome');
  }
  
}
