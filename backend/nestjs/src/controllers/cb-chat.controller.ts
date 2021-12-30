import { Controller, Post, Req, Res, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConversationEntity } from 'src/entities/eb-conversation.entity';
import { Repository } from 'typeorm';

@Controller('cb-chat')
export class ChatController {

    constructor(@InjectRepository(ConversationEntity)
                private conversation: Repository<ConversationEntity>) {}

    @Post('check')
    async checkRoomDatas (@Req() req, @Res() res) {
      const check = await this.conversation.findOne({where: {name: req.body.data}});
      if (!check)
        res.send('ok');
      else
        res.send('ko');
    }

    @Get('ban')
    async banUser(@Req() req, @Res() res) {
      console.log(req);
      // const userToBan
    }
}
