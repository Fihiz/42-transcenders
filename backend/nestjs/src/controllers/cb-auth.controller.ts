import { Controller, Get, Req, Res } from '@nestjs/common';
import { AuthService } from 'src/services/sb-auth.service';

@Controller('cb-auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Get()
    async redirection(@Req() req, @Res() resp) {
      const codeUrl = req.query.code;
      try {
          console.log('before resp');
          const result = await this.authService.getLogInfo(codeUrl);
          resp.send({
              data: result.data,
              status: 'OK auth back'
          });
      }
      catch (error) {
          console.log(error);
      }
    }
}
