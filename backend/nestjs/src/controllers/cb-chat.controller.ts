import { Controller, Post, Req, Res, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConversationEntity } from 'src/entities/eb-conversation.entity';
import { ConvService } from 'src/services/Conv/sb-conv.service';
import { ChatService } from 'src/services/sb-chat.service';
import { Repository } from 'typeorm';

@Controller('cb-chat')
export class ChatController {

    constructor(@InjectRepository(ConversationEntity)
                private conversation: Repository<ConversationEntity>,
                private chatService: ChatService,
                private convService: ConvService) {}

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
      const userToBan = req.query.banned;
      const userAsking = req.query.requester;
      const conv_id = req.query.conv_id;
      const room: ConversationEntity = await this.convService.findOneConversation(conv_id);
      const target = await this.chatService.checkConditionToModifie(userToBan, userAsking, conv_id)
      if (target === 'ko')
        res.send('not allowed to ban');
      else
        (await this.convService.removeMemberOfConv(room.name, conv_id, userToBan, target)) !== 'ko' ? res.send('ok') : res.send('ko');
    }

    @Get('newAdmin')
    async addNewAdmin(@Req() req, @Res() res) {
      const target = req.query.newAdmin;
      const userAsking = req.query.requester;
      const conv_id = req.query.conv_id;
      if ((await this.chatService.checkConditionToModifie(target, userAsking, conv_id)) === 'ko')
        res.send('not allowed to ban');
      else {
        (await this.chatService.addAdminInConv(target, conv_id)) !== 'ko' ? res.send('ok') : res.send('ko');
      }

    }
}
