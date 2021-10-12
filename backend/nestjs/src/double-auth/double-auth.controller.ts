import { Controller, Get } from '@nestjs/common';
const nodemailer = require('nodemailer');

@Controller('double-auth')
export class DoubleAuthController {
    @Get()
    sendMail() {
        const transporter = nodemailer.createTransport({
          service: 'Yahoo',
          auth: {
            user: 'mytranscendance@yahoo.com',
            pass: 'wahknbmjdonknjgc',
          },
        });
        let sendTo = 'spl919@orange.fr';
        const mailOptions = {
          from: 'mytranscendance@yahoo.com',
          to: sendTo,
          subject: 'i find you',
          text: `u aere the best!`,
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
      }
}
