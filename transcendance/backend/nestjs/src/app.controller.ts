import { Controller, Get } from '@nestjs/common';
import { getRepository} from 'typeorm';
import { ConversationService } from './database/entities/conversation/conversation.service';
import { StatEntity } from './database/entities/stat/stat.entity';
import { StatService } from './database/entities/stat/stat.service';
import { WebAppUserEntity } from './database/entities/webAppUser/webAppUser.entity';
import { WebAppUserModule } from './database/entities/webAppUser/webAppUser.module';
import { WebAppUserService } from './database/entities/webAppUser/webAppUser.service';



@Controller()
export class AppController {

  constructor (private convService: ConversationService, private userService: WebAppUserService){}

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

  @Get('testFindAll')
  async test() {
    console.log(await this.convService.findAll())
    console.log(!(await this.userService.findAll('pgoudettt')));
    
  }

  @Get()
  async welcome()
  {
    return ('welcome');
  }
  
}
