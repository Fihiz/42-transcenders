import { Controller, Get } from '@nestjs/common';
import { UserService } from 'src/services/sb-user.service';

@Controller('cb-user')
export class UserController {
    constructor(private userService: UserService) {}

    // will be used later to update our user
}
