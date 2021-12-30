import { Controller, Get, Req, Res } from '@nestjs/common';
const nodemailer = require('nodemailer');

@Controller('double-auth')
export class DoubleAuthController {
    @Get()
    sendMail(@Req() req, @Res() res) {
      const email = req.body.email;
      const code = Math.random() * 10000;
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
        // await this.sleep(10000); // si delai trop court il plante
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
            //si plante, faire un go to un egestion d erreur mettre un gros delai et ensuite se reco
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
        res.send(code);
      }
}