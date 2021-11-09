import { Controller, Get, Req } from '@nestjs/common';
import { passport } from "../auth/auth.controller";

@Controller('callback')
export class CallbackController {
    @Get()
    testFunc(@Req() req)
    {
        passport.authenticate('42')(req);
        console.log('you reached the callback');
        return null;
    }
}
