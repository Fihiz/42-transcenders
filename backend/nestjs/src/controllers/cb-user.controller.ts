import { Controller, Get } from '@nestjs/common';
import { UserService } from 'src/services/sb-user.service';

@Controller('cb-user')
export class UserController {
    constructor(private userService: UserService) {}

    // @Get()
    // async getWebAppUser () : Promise<any> {
    //   const res = await this.userService.findOneWebUser("Moldu_01"); // ?
    //   console.log("Our res into cb-user controller: ", res);
    //   return(res);
    // }
}
