import { Controller, Post, Req, Res, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConversationEntity } from 'src/entities/eb-conversation.entity';
import { ChatterService } from 'src/services/sb-chatter.service';
import { ConvService } from 'src/services/sb-conv.service';
import { ChatService } from 'src/services/sb-chat.service';
import { Repository } from 'typeorm';
import { UserService } from 'src/services/sb-user.service';

@Controller('cb-chat')
export class ChatController {

    constructor(@InjectRepository(ConversationEntity)
                private conversation: Repository<ConversationEntity>,
                private chatService: ChatService,
                private convService: ConvService,
                private chatterService: ChatterService,
                private userService: UserService) {}

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
        res.send('Action not allowed');
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
        if ( resRemove != 'ok' && resCreate === 'ko')
          res.send('ko');
        else
          res.send('ok');;
      }
    }

    @Get('kick')
    async KickUser(@Req() req, @Res() res) {
      const userToBan = req.query.banned;
      const userAsking = req.query.requester;
      const conv_id = req.query.conv_id;
      const room: ConversationEntity = await this.convService.findOneConversation(conv_id);
      const target = await this.chatService.checkConditionToModifie(userToBan, userAsking, conv_id)
      if (target === 'ko')
        res.send('Action not allowed');
      else {
        const resRemove = await this.convService.removeMemberOfConv(room.name, conv_id, userToBan, target);
        res.send(resRemove === 'ok' ? 'ok' : 'ko');
      }
    }

    @Get('newOwner')
    async addNewOwner(@Req() req, @Res() res) {
      const target = req.query.newAdmin;
      const userAsking = req.query.requester;
      const conv_id = req.query.conv_id;
      if ((await this.chatService.checkConditionToModifie(target, userAsking, conv_id)) === 'ko')
        res.send('Action not allowed');
      else {
        (await this.chatService.addOwnerInConv(target, conv_id)) !== 'ko' ? res.send('ok') : res.send('ko');
      }
    }

    @Get('newAdmin')
    async addNewAdmin(@Req() req, @Res() res) {
      const target = req.query.newAdmin;
      const userAsking = req.query.requester;
      const conv_id = req.query.conv_id;
      if ((await this.chatService.checkConditionToModifie(target, userAsking, conv_id)) === 'ko')
        res.send('Action not allowed');
      else {
        (await this.chatService.addAdminInConv(target, conv_id)) !== 'ko' ? res.send('ok') : res.send('ko');
      }
    }

    @Get('newChatter')
    async addNewChatter(@Req() req, @Res() res) {
      const target = req.query.newAdmin;
      const userAsking = req.query.requester;
      const conv_id = req.query.conv_id;
      if ((await this.chatService.checkConditionToModifie(target, userAsking, conv_id)) === 'ko')
        res.send('Action not allowed');
      else {
        (await this.chatService.addChatterInConv(target, conv_id)) !== 'ko' ? res.send('ok') : res.send('ko');
      }
    }

    @Get('Mute')
    async Mute(@Req() req, @Res() res) {
      const conv_id = req.query.conv_id;
      const userAsking = await this.chatService.findOneChatter(req.query.requester, conv_id);
      const target = await this.chatService.findOneChatter(req.query.mutedOne, conv_id);
      const conv: ConversationEntity = await this.convService.findOneConversation(conv_id);
      if (!target)
        res.send('The entered information cannot be processed');
      else {
        if (conv.type === 'private')
          res.send((await this.chatterService.muteSomeone(target)) === 'ok' ?  'ok' : 'ko');
        else {
          if ((userAsking.chat_role !== 'admin' && userAsking.chat_role !== 'owner') || target.chat_role === 'owner')
            res.send('Error: not good role');
          else {
            res.send((await this.chatterService.muteSomeone(target)) === 'ok' ?  'ok' : 'ko');
          }
        }
      }
    }

    @Get('DeMute')
    async DeMute(@Req() req, @Res() res) {
      const conv_id = req.query.conv_id;
      const userAsking = await this.chatService.findOneChatter(req.query.requester, conv_id);
      const target = await this.chatService.findOneChatter(req.query.mutedOne, conv_id);
      const conv: ConversationEntity = await this.convService.findOneConversation(conv_id);
      if (conv.type === 'private')
        res.send((await this.chatterService.deMuteSomeone(target)) === 'ok' ?  'ok' : 'ko');
      else {
        if ((userAsking.chat_role !== 'admin' && userAsking.chat_role !== 'owner') || target.chat_role === 'owner' || (target.login === userAsking.login))
          res.send('Error: not good role');
        else {
          res.send((await this.chatterService.deMuteSomeone(target)) === 'ok' ?  'ok' : 'ko');
        }
      }
    }

    @Get('getRoomInfo')
    async getRoomInfo(@Req() req, @Res() res) {
      const conv_id = req.query.conv_id;
      const name = req.query.name;

      const role = await this.chatterService.findOneChatter(conv_id, name);
      let chatters = await this.chatterService.findAllChatters(conv_id);
      const avatars = new Array();
      const login = new Array();
      const roles = new Array();

      for (const chatter of chatters) {
        const avatar = (await this.userService.findOneApiUser(chatter.login)).avatar;
        // avatars.push(avatar.replace("localhost:3000", req.rawHeaders[req.rawHeaders.indexOf('Host') + 1]));
        login.push(chatter.login);
        roles.push(chatter.chat_role);
      }
      res.send({avatars: avatars, login: login, roles: roles});
    }

    @Get('getMembers')
    async getMembersPseudo(@Req() req, @Res() res) {
      const tmp = new Array(...Object.entries(req.query));
      const members = []
      for (const obj of tmp) {
        members.push(obj[1] as string);
      }
      const pseudos: Array<string> = [];
      for (const member of members) {
        const user = await this.userService.findOneAppUser(member);
        pseudos.push(user.pseudo)
      }
      res.send(pseudos);
    }
}
