import { Controller, Get } from '@nestjs/common';
import { UserService } from 'src/services/sb-user.service';

@Controller('cb-user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    getWebAppUser () : Promise<any> {
      const res = this.userService.findWebOne("Moldu_01");
      console.log("Our res into cb-user controller: ", res);
      return(res);
    }
}
