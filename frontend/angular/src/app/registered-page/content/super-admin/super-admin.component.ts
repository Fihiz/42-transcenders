import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Socket } from 'ngx-socket-io';
import { if_conversation } from 'src/app/interfaces/if_conversation';
import { GlobalService } from 'src/app/services/sf-global.service';
import { UserService } from 'src/app/services/sf-user.service';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css'],
})
export class SuperAdminComponent implements OnInit {
  allUsersInfo: Array<any> = [];
  // allConversations: Map<if_conversation, Array<{login: string, role: string}>> = new Map();
  listConv: Array<{
    conv: if_conversation;
    members: Array<{ login: string; role: string }>;
  }> = [];

  constructor(
    private socket: Socket,
    private userService: UserService,
    public global: GlobalService
  ) {}

  async onSetOwner(conv: if_conversation, login: string) {
    const repsonse = await axios.get(
      `http://${window.location.host}:3000/cb-chat/newOwner`,
      {
        params: {
          newAdmin: login,
          requester: 'superadmin',
          conv_id: conv.conv_id,
        },
      }
    );
    // if (repsonse.data === 'ok') {
    //   alert('ok');
    // }
  }

  async onSetAdmin(conv: if_conversation, login: string) {
    const repsonse = await axios.get(
      `http://${window.location.host}:3000/cb-chat/newAdmin`,
      {
        params: {
          newAdmin: login,
          requester: 'superadmin',
          conv_id: conv.conv_id,
        },
      }
    );
    // if (repsonse.data === 'ok') {
    //   alert('ok');
    // }
    // console.log('convName = ', conv.name, 'login = ', login);
  }

  async onSetChatter(conv: if_conversation, login: string) {
    const repsonse = await axios.get(
      `http://${window.location.host}:3000/cb-chat/newChatter`,
      {
        params: {
          newAdmin: login,
          requester: 'superadmin',
          conv_id: conv.conv_id,
        },
      }
    );
    // if (repsonse.data === 'ok') {
    //   alert('ok');
    // }
  }

  onDelete(conv: if_conversation) {
    this.socket.emit('deleteRoom', conv);
    console.log('the room is = ', conv);
  }

  onGetAllUsersList() {
    this.socket.emit('allUsersInApp');
    this.socket.emit('GiveAllConv', this.global.login);
  }

  async onSetNewRole(currentLogin: string, newRole: string) {
    const data = {
      login: currentLogin,
      role: newRole,
    };
    await this.userService.adminChangeUserRole(data);
    console.log(`role is changed !`);
    this.socket.emit('currentUserNewRoleInApp', currentLogin);
  }

  async onBanChange(currentLogin: string, isBanned: boolean) {
    const data = {
      login: currentLogin,
      isBanned: isBanned,
    };
    await this.userService.adminChangeIsBanned(data);
    this.socket.emit('log-out', {login: currentLogin});
    this.socket.emit('allUsersInApp');
  }

  ngOnInit(): void {
    this.socket.on('allUsersInApp', (data: any) => {
      this.allUsersInfo = [];
      this.allUsersInfo = data;
    });

    this.socket.on('allConversationsSA', (data: any) => {
      this.listConv = [];
      console.log('SA all conv=', data);
      const tmp: Map<
        string,
        Array<{ login: string; role: string }>
      > = new Map();
      let i = -1;
      while (++i < data[0].length) {
        const members = [];
        for (const member of data[1][i]) {
          members.push(member);
        }
        console.log(members);
        this.listConv.push({ conv: data[0][i], members });
      }
      console.log('this.listConv = ', this.listConv);
    });
  }
}
