import { Controller, Get, Req, Res } from '@nestjs/common';
import { UserService } from 'src/services/sb-user.service';
const nodemailer = require('nodemailer');

@Controller('double-auth')
export class DoubleAuthController {

    private code: number = -1;
    constructor(private userService: UserService){}

    @Get('activate')
    async activeOrDeactiveDoubleAuth(@Req() req, @Res() res) {
      if (req.query.status != 'activate' && req.query.status != 'deactivate')
        res.send('ko');
      else
        res.send((await this.userService.activateDoubleAuth(req.query.login, req.query.status)));
    }

    @Get('isActivate') 
    async isDoubleAuthActive(@Req() req, @Res() res) {
      console.log('req = ', req.query[0])
      const response = await this.userService.findOneAppUser(req.query[0]);
      if (response)
        res.send(response.doubleAuth);
      else
        res.send(false);
    }

    @Get('check') 
    checkFunc(@Req() req, @Res() res) {
      const codeReceived = req.query[0];
      if (this.code === Number(codeReceived))
        res.send('ok');
      else
        res.send('ko');
    }

    @Get()
    async sendMail(@Req() req, @Res() res) {
      const email = await this.userService.getMail(req.query[0])
      console.log('emeil = ', email);
      let code = "";
      for(let i = 0; i < 4; i++)
        code = code + (Math.floor(Math.random() * 10)).toString();
      // const code = (Math.round(Math.random() * 10000)).toString();
      this.code = Number(code);
        const transporter = nodemailer.createTransport({
          service: 'Yahoo',
          auth: {
            user: 'mytranscendance@yahoo.com',
            pass: 'wahknbmjdonknjgc',
          },
        });
        const mailOptions = {
          from: 'mytranscendance@yahoo.com',
          to: email,
          subject: 'Your activation code to log on 42Pong',
          text: code,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            res.send('ko');
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        res.send('ok');
      }
}