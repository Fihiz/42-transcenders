import { Injectable } from '@angular/core';
import axios from 'axios';
import { if_social } from '../interfaces/if-social';
import { if_stats } from '../interfaces/if-stats';
import { if_conversation } from '../interfaces/if_conversation';

@Injectable({
  providedIn: 'root',
})
export class SocialService {
  social?: if_social;

  constructor() {}

  checkIfConvBlock(relations: Array<{relation: any, stat: if_stats, achievements: any}>, conv: if_conversation) {
    if (conv.members.length != 2)
      return (true)
    for (const relation of relations) {
      if (conv.members.find(member => member === relation.relation.user2.login)) {
        if (relation.relation.blocked === true)
          return (false);
      }
    }
    return (true);
  }

  createBlockedList(relations: Array<{relation: any, stat: if_stats, achievements: any}>) {
    const blockLIst: string[]  = [];

    for (const relation of relations) {
      if (relation.relation.blocked === true)
        blockLIst.push(relation.relation.user2.login);
    }
    return (blockLIst);
  }

  async blockFriend(data: {currentLogin: string, newFriendLogin: string, friendship: boolean}) {
    const response = await axios.get(`http://${window.location.host}:3000/cb-social/block`, {params: data});
    if (response.data === 'ok')
      return ('ok');
    return ('ko');
  }

  async unblockFriend(data: {currentLogin: string, newFriendLogin: string, friendship: boolean}) {
    const response = await axios.get(`http://${window.location.host}:3000/cb-social/unblock`, {params: data});
    if (response.data === 'ok')
      return ('ok');
    return ('ko');
  }
}


