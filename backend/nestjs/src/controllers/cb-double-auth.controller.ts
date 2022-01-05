import { Controller, Get, Req, Res } from '@nestjs/common';
import { UserService } from 'src/services/sb-user.service';
const nodemailer = require('nodemailer');

@Controller('double-auth')
export class DoubleAuthController {

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
      console.log('response = ', response);
      if (response)
        res.send(response.doubleAuth);
      else
        res.send(false);
    }



    @Get()
    async sendMail(@Req() req, @Res() res) {
      const email = await this.userService.getMail(req.query[0])
      console.log('emeil = ', email);
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