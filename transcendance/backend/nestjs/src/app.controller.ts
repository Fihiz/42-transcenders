import { Controller, Get } from '@nestjs/common';
import { getRepository} from 'typeorm';
import { StatEntity } from './database/entities/stat/stat.entity';
import { StatService } from './database/entities/stat/stat.service';
import { WebAppUserEntity } from './database/entities/webAppUser/webAppUser.entity';
import { WebAppUserService } from './database/entities/webAppUser/webAppUser.service';



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
