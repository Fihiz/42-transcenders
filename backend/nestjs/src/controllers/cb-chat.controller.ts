import { Controller, Post, Req, Res, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConversationEntity } from 'src/entities/eb-conversation.entity';
import { ChatterService } from 'src/services/sb-chatter.service';
import { ConvService } from 'src/services/sb-conv.service';
import { ChatService } from 'src/services/sb-chat.service';
import { Repository } from 'typeorm';

@Controller('cb-chat')
export class ChatController {

    constructor(@InjectRepository(ConversationEntity)
                private conversation: Repository<ConversationEntity>,
                private chatService: ChatService,
                private convService: ConvService,
                private chatterService: ChatterService) {}

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
      else {
        const resRemove = await this.convService.removeMemberOfConv(room.name, conv_id, userToBan, target);
        const resCreate = await this.chatterService.createBanUser({
          ban: true,
          chat_role: 'chatter',
          conv_id: conv_id,
          is_present: 'yes',
          login: userToBan,
          muted: false
        });
        console.log('res == ', resRemove, resCreate)
        if ( resRemove != 'ok' && resCreate === 'ko')
          res.send('ko');
        else
          res.send('ok');;
      }
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

    @Get('Mute')
    async Mute(@Req() req, @Res() res) {
      console.log('req.query = ', req.query);
      const conv_id = req.query.conv_id;
      const userAsking = await this.chatService.findOneChatter(req.query.requester, conv_id);
      const target = await this.chatService.findOneChatter(req.query.mutedOne, conv_id);
      const conv: ConversationEntity = await this.convService.findOneConversation(conv_id);
      if (conv.type === 'private')
        res.send((await this.chatterService.muteSomeone(target)) === 'ok' ?  'ok' : 'ko');
      else {
        if (userAsking.chat_role !== 'admin')
          res.send('Error: not good role');
        else {
          res.send((await this.chatterService.muteSomeone(target)) === 'ok' ?  'ok' : 'ko');
        }
      }
    }

    @Get('DeMute')
    async DeMute(@Req() req, @Res() res) {
      console.log('req.query = ', req.query);
      const conv_id = req.query.conv_id;
      const userAsking = await this.chatService.findOneChatter(req.query.requester, conv_id);
      const target = await this.chatService.findOneChatter(req.query.mutedOne, conv_id);
      const conv: ConversationEntity = await this.convService.findOneConversation(conv_id);
      if (conv.type === 'private')
        res.send((await this.chatterService.deMuteSomeone(target)) === 'ok' ?  'ok' : 'ko');
      else {
        if (userAsking.chat_role !== 'admin')
          res.send('Error: not good role');
        else {
          res.send((await this.chatterService.deMuteSomeone(target)) === 'ok' ?  'ok' : 'ko');
        }
      }
    }
}
