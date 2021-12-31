import { Controller, Get, Req, Res } from '@nestjs/common';
import { UserService } from 'src/services/sb-user.service';
const nodemailer = require('nodemailer');

@Controller('double-auth')
export class DoubleAuthController {

    constructor(private userService: UserService){}

    @Get('activate')
    async activeOrDeactiveDoubleAuth(@Req() req, @Res() res) {
      if (req.body.status != 'activate' && req.body.status != 'deactivate')
        res.send('ko');
      res.send((await this.userService.activateDoubleAuth(req.body.login, req.body.status)));
    }



    @Get()
    async sendMail(@Req() req, @Res() res) {
      const email = await this.userService.getMail(req.query[0])
      const code = (Math.round(Math.random() * 10000)).toString();
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
          subject: 'i find you',
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
        res.send(code.toString());
      }
}