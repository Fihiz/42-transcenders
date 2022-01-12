import { Body,  Get, Req, Res, Post, Controller } from '@nestjs/common';
import { ChatterEntity } from 'src/entities/eb-chatter.entity';
import { ChatterService } from 'src/services/sb-chatter.service';
import { SocialService } from 'src/services/sb-social.service';
import { UserService } from 'src/services/sb-user.service';

@Controller('cb-social')
export class SocialController {

  constructor(private socialService: SocialService) {}

  @Get('block')
  async BlockSomeone(@Req() req, @Res() res) {
    const datas = req.query;
    const login = datas.currentLogin;
    const target = datas.newFriendLogin;
    const isBlocked = await this.socialService.block(login, target, true);
    res.send(isBlocked === true ? 'ok' : 'ko');
  }

  @Get('unblock')
  async unBlockSomeone(@Req() req, @Res() res) {
    const datas = req.query;
    const login = datas.currentLogin;
    const target = datas.newFriendLogin;
    const isBlocked = await this.socialService.block(login, target, false);
    res.send(isBlocked === true ? 'ok' : 'ko');
  }

}
