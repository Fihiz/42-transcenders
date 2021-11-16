import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './interfaces/user';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private userService: UserService) {}

  @Get()
  @Headers('Access-Control-Allow-Origin', '*')
    getUser() : User {
      return this.userService.getUser();
    }
}
