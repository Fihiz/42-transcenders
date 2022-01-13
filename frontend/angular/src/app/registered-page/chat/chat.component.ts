import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';
import { if_message } from 'src/app/interfaces/if-message';
import { if_conversation } from 'src/app/interfaces/if_conversation';
import { if_emission } from 'src/app/interfaces/if_emmission';
import { ChatService } from 'src/app/services/sf-chat.service';
import { GlobalService } from 'src/app/services/sf-global.service';
import axios from 'axios';
import { if_game_type } from 'src/app/interfaces/if-game';
import { GameService } from 'src/app/services/sf-game.service';
import { SocialService } from 'src/app/services/sf-social.service';
import { UserService } from 'src/app/services/sf-user.service';
import { if_stats } from 'src/app/interfaces/if-stats';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  convMessages: Array<if_message> = [];
  membersPseudo: Array<{ login: string; pseudo: string }> = [];
  users: Array<string> = new Array();
  currentConv: if_conversation = {
    avatar: '',
    conv_id: 0,
    members: new Array(),
    name: '',
    password: '',
    type: 'public',
  };
  currentRole: string = 'chatter';
  listConv: Array<if_conversation> = [];
  emission: if_emission = {
    login: this.global.login as string,
    socketId: this.global.socketId as string,
    data: {},
  };
  login: string = '';
  convInfo: Map<string, { role: string; avatar: string }> = new Map();
  inputChatAndPlay: string = '';
  sets: if_game_type[] = [];
  listAllAvailableRooms: Array<if_conversation> = [];
  relations: Array<{relation: any, stat: if_stats, achievements: any}> = [];
  blockList: string[] = []
  
  constructor(
    private socket: Socket,
    private global: GlobalService,
    private chatService: ChatService,
    private gameService: GameService,
    private router: Router,
    private userService: UserService,
    private socialService: SocialService
  ) {}

  async getSetsParty() {
    this.sets = await this.gameService.getTypesOfParty();
  }

  onSendMessage() {
    const content = (<HTMLInputElement>document.getElementById('input-message'))
      .value;
    this.chatService.clearInputValues('input-message');
    if (content.trim().length !== 0) {
      this.emission.data = {
        conv_id: this.currentConv.conv_id,
        date: new Date(),
        content: content,
      };
      this.emission.socketId = this.global.socketId as string;
      if (this.currentConv.name) this.socket.emit('message', this.emission);
      // else alert('Error: No conv selected');
    } else console.log('Warning : cannot send an empty message');
  }

  keyUpEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.currentConv.name) {
      this.onSendMessage();
    }
  }

  onThreeDotsClick() {
    this.socket.emit('allAvailableRoomsInApp');
  }

  onSelectOneToOneUserConv() {
    const selectedUser: string = (<HTMLInputElement>(
      document.getElementById('search-user')
    ))?.value;
    if (selectedUser) {
      if (selectedUser === this.global.login) {
        alert("Can't create a room with yourself");
        return;
      }
      const LoginEqUsr = this.chatService.loginEqSelectedUsrANDmembersEqLogin(
        this.listConv,
        selectedUser
      );
      const LoginDifUsr = this.chatService.loginDifSelectedUsrANDuserFound(
        this.listConv,
        selectedUser
      );
      (<HTMLInputElement>document.getElementById('search-user')).value = '';
      if (LoginEqUsr) {
        this.currentConv = LoginEqUsr;
        this.emission = this.chatService.emission(
          'getMessages',
          this.currentConv,
          this.currentConv.conv_id
        );
      } else if (LoginDifUsr) {
        this.currentConv = LoginDifUsr;
        this.emission = this.chatService.emission(
          'getMessages',
          this.currentConv,
          this.currentConv.conv_id
        );
      } else {
        const data = this.chatService.createPrivateRoom(selectedUser);
        this.emission = this.chatService.emission(
          'newConversation',
          this.currentConv,
          0,
          data
        );
      }
    }
  }

  async onCreateRoom() {
    const res = await this.chatService.takeAndCheck(this.users);
    if (res.status != 'ok') return;
    const roomAvatarsArray: string[] = [
      '../../../assets/room-pictures/1.png',
      '../../../assets/room-pictures/2.png',
      '../../../assets/room-pictures/3.png',
      '../../../assets/room-pictures/4.png',
      '../../../assets/room-pictures/5.png',
      '../../../assets/room-pictures/6.png',
      '../../../assets/room-pictures/7.png',
      '../../../assets/room-pictures/8.png',
      '../../../assets/room-pictures/9.png',
    ];
    const newConv: if_conversation = {
      avatar:
        roomAvatarsArray[Math.floor(Math.random() * roomAvatarsArray.length)],
      conv_id: 0,
      name: res.data.roomName,
      password: btoa(res.data.password),
      type: res.data.password.length === 0 ? 'public' : 'protected',
      members: res.data.members,
    };
    if (!newConv.members.find((tmp) => tmp === this.global.login))
      newConv.members.push(this.global.login as string);
    this.emission = this.chatService.emission(
      'newConversation',
      this.currentConv,
      0,
      newConv
    );
  }

  async onSelectConv(value: any) {
    
    this.membersPseudo = [];
    this.convMessages = [];
    this.currentConv = this.chatService.getConvFromId( value, this.listConv, this.currentConv);
      const tmpMembers = ( await axios.get(`http://${window.location.host}:3000/cb-chat/getMembers`,{ params: this.currentConv.members })).data;
      let i = -1;
      while (++i < tmpMembers.length)
        this.membersPseudo.push({
          login: this.currentConv.members[i],
          pseudo: tmpMembers[i],
        });
      this.emission = this.chatService.emission( 'getMessages', this.currentConv, value);
      const response = (await axios.get(`http://${window.location.host}:3000/cb-chat/getRoomInfo`,{params: {
              conv_id: this.currentConv.conv_id,
              name: this.global.login,
            }})).data;
      for (let i = 0; i < response.login.length; i++) {
        this.convInfo.set(response.login[i], {
          role: response.roles[i],
          avatar: response.avatars[i],
        });
      }
      this.currentRole = this.convInfo.get(this.global.login as string)?.role as string;
  }

  onJoinRoom() {
    const roomName = (<HTMLInputElement>(
      document.getElementById('room-name-join')
    ))?.value;
    const roomPassword = (<HTMLInputElement>(
      document.getElementById('room-password-join')
    ))?.value;
    this.chatService.clearInputValues('room-name-join');
    this.chatService.clearInputValues('room-password-join');
    this.emission = this.chatService.emission('joinRoom', this.currentConv, 0, {
      roomName: roomName,
      roomPassword: btoa(roomPassword),
    });
  }

  onAddFriend() {
    const name = (<HTMLInputElement>document.getElementById('add-friend'))
      .value;
    this.chatService.clearInputValues('add-friend');
    if (name) {
      document.getElementById('add-user-form')?.classList.add('hidden');
      this.emission = this.chatService.emission(
        'addFriend',
        this.currentConv,
        this.currentConv.conv_id,
        {
          name: name,
          conv_id: this.currentConv.conv_id,
          roomName: this.currentConv.name,
        }
      );
    }
  }

  async onMute() {
    const value = (<HTMLInputElement>document.getElementById('mute-room'))
      ?.value;
    this.chatService.clearInputValues('mute-room');
    if (value) {
      const isMute = await axios.get(
        `http://${window.location.host}:3000/cb-chat/Mute`,
        {
          params: {
            mutedOne: value,
            requester: this.login,
            conv_id: this.currentConv.conv_id,
          },
        }
      );
      if (isMute.data !== 'ok')
        alert(
          isMute.data === 'ko'
            ? 'The entered information cannot be processed'
            : isMute.data
        );
    }
  }

  async onUnmute() {
    const value = (<HTMLInputElement>document.getElementById('unmute-room'))
      ?.value;
    this.chatService.clearInputValues('unmute-room');
    if (value) {
      const isDeMute = await axios.get(
        `http://${window.location.host}:3000/cb-chat/DeMute`,
        {
          params: {
            mutedOne: value,
            requester: this.login,
            conv_id: this.currentConv.conv_id,
          },
        }
      );
      if (isDeMute.data !== 'ok') alert(
        isDeMute.data === 'ko'
          ? 'The entered information cannot be processed'
          : isDeMute.data);
    }
  }

  async onNewAdmin() {
    const value = (<HTMLInputElement>document.getElementById('add-new-admin'))
      ?.value;
    this.chatService.clearInputValues('add-new-admin');
    if (value) {
      const isBan = await axios.get(
        `http://${window.location.host}:3000/cb-chat/newAdmin`,
        {
          params: {
            newAdmin: value,
            requester: this.login,
            conv_id: this.currentConv.conv_id,
          },
        }
      );
      if (isBan.data !== 'ok') alert(isBan.data);
      this.chatService.emission(
        'changeRoleInConv',
        this.currentConv,
        this.currentConv.conv_id,
        { role: 'admin', name: value }
      );
    }
  }

  async onKick() {
    const value = (<HTMLInputElement>document.getElementById('kick-room'))
      ?.value;
    this.chatService.clearInputValues('kick-room');
    if (value) {
      const isBan = await axios.get(
        `http://${window.location.host}:3000/cb-chat/kick`,
        {
          params: {
            banned: value,
            requester: this.login,
            conv_id: this.currentConv.conv_id,
          },
        }
      );
      if (isBan.data !== 'ok') alert(isBan.data);
      else {
        this.chatService.emission('aUserIsBan', this.currentConv, 0, {
          conv_name: this.currentConv.name,
          conv_id: this.currentConv.conv_id,
          target: value,
        });
      }
    }
  }

  onChangePassword() {
    const value = (<HTMLInputElement>document.getElementById('change-password'))
      ?.value;
    this.chatService.clearInputValues('change-password');
    this.chatService.emission(
      'changePassword',
      this.currentConv,
      this.currentConv.conv_id,
      {
        password: btoa(value),
        conv_id: this.currentConv.conv_id,
      }
    );
  }

  async onBan() {
    const value = (<HTMLInputElement>document.getElementById('ban-room'))
      ?.value;
    this.chatService.clearInputValues('ban-room');
    if (value) {
      const isBan = await axios.get(
        `http://${window.location.host}:3000/cb-chat/ban`,
        {
          params: {
            banned: value,
            requester: this.login,
            conv_id: this.currentConv.conv_id,
          },
        }
      );
      if (isBan.data !== 'ok') alert(isBan.data);
      else {
        this.chatService.emission('aUserIsBan', this.currentConv, 0, {
          conv_name: this.currentConv.name,
          conv_id: this.currentConv.conv_id,
          target: value,
        });
      }
    }
  }

  onLeave() {
    if (this.currentConv.name != '') {
      this.emission = this.chatService.emission(
        'leaveRoom',
        this.currentConv,
        this.currentConv.conv_id
      );
      const index = this.listConv.indexOf(this.currentConv);
      this.listConv.splice(index, 1);
      this.currentConv = {
        avatar: '',
        conv_id: 0,
        members: new Array(),
        name: '',
        password: '',
        type: 'public',
      };
      this.convMessages = [];
    }
  }

  clearConv() {
    this.currentConv.avatar = '';
    this.currentConv.conv_id = 0;
    this.currentConv.members = [];
    this.currentConv.name = '';
    this.currentConv.password = '';
    this.currentConv.type = '';
    this.convMessages = [];
  }
  /* FOR HIDING PASSWORDS */
  hideCreateRoomPassword() {
    const pass = <HTMLInputElement>document.getElementById('password');
    if (pass.type === 'password') pass.type = 'text';
    else pass.type = 'password';
  }

  hideJoinRoomPassword() {
    const pass = <HTMLInputElement>(
      document.getElementById('room-password-join')
    );
    if (pass.type === 'password') pass.type = 'text';
    else pass.type = 'password';
  }

  hideRoomNewPassword() {
    const pass = <HTMLInputElement>document.getElementById('change-password');
    if (pass.type === 'password') pass.type = 'text';
    else pass.type = 'password';
  }

  async ngOnInit(): Promise<void> {
    this.getSetsParty();
    this.relations = await this.userService.getAllMyrelations(this.global.login as string);
    this.blockList = this.socialService.createBlockedList(this.relations);
    this.login = this.global.login as string;
    this.inputChatAndPlay = (<HTMLInputElement>(
      document.getElementById('search-user')
    ))?.value;
    this.socket.on('users', (data: any) => {
      this.users = data;
    });
    this.socket.on('allMessages', (data: if_message[]) => {
      if (data.length > 0 && data[0].conv_id === this.currentConv.conv_id) {
        this.convMessages.splice(0, this.convMessages.length);
        this.convMessages = data;
        this.convMessages = this.chatService.clearMessages(this.convMessages, this.blockList);
      }
    });
    this.socket.on('allConversations', (data: any) => {
      this.listConv = data as Array<if_conversation>;
    });
    this.socket.on('newConversation', (data: any) => {
      this.listConv.push(data);
    });
    this.socket.on('youAreBan', (data: any) => {
      if (this.listConv.length === 0) this.listConv = []; /* Non-sens */
      const index = this.listConv.findIndex(
        (conv) => conv.conv_id === data.conv_id && conv.name === data.conv_name
      );
      if (index >= 0) this.listConv.splice(index, 1);
      if (this.currentConv.conv_id === data.conv_id) this.clearConv();
    });
    this.socket.on('error', (data: any) => {
      alert(data);
    });
    this.socket.on('newMember', (data: any) => {
      const conv = this.listConv.find((conv) => conv.conv_id === data.conv_id);
      if (!conv?.members.find((member) => member === data.name))
        conv?.members.push(data.name);
      console.log(conv);
    });
    this.socket.on('updatedRoleInConv', (data: any) => {
      this.currentRole = data;
    });
    this.socket.on('MemberLeaves', (data: any) => {
      const conv = this.listConv.find((conv) => conv.conv_id === data.conv_id);
      const index = conv?.members.findIndex((member) => member === data.login);
      if (typeof index === 'number') conv?.members.splice(index, 1);
    });
    this.socket.on('newPassword', (data: any) => {
      const conv: if_conversation = this.listConv.find(
        (conv) => conv.conv_id === data.conv_id
      ) as if_conversation;
      conv.password = data.password;
      conv.type = 'protected';
      // need to change the room type into the Conv entity when we change password as empty
      // if (data.password) conv.type = 'protected';
      // else conv.type = 'public';
    });
    //For View Room in chat
    this.socket.on('allAvailableRoomsInApp', (data: any) => {
      this.listAllAvailableRooms = data;
    });
    //For View Room in chat
    this.socket.on('newAvailableRoomsInApp', (data: any) => {
      this.listAllAvailableRooms.push(data);
    });
    //For View Room in chat
    this.socket.on('deleteAvailableRoomsInApp', (data: any) => {
      if (this.listAllAvailableRooms.length === 0)
        this.listAllAvailableRooms = []; /* Non-sens */
      const index = this.listAllAvailableRooms.findIndex(
        (conv) => conv.conv_id === data.conv_id && conv.name === data.conv_name
      );
      if (index >= 0) this.listAllAvailableRooms.splice(index, 1);
      if (this.currentConv.conv_id === data.conv_id) this.clearConv();
    });

    this.socket.on('errorInvitation', (message: if_message) => {
      if (message.conv_id === this.currentConv.conv_id) {
        this.convMessages.push(message);
      }
    });

    this.socket.on('launchgameInvitation', (game: any) => {
      console.log(game);
      this.router.navigate([`/pong/game/${game}`]);
    });
    this.socket.on('block', async (data: any) => {
      console.log('block = ', this.blockList);
      this.relations = await this.userService.getAllMyrelations(this.global.login as string);
      this.blockList = this.socialService.createBlockedList(this.relations);
      console.log('block = ', this.blockList);

    });
    this.socket.on('unBlock', async (data: any) => {
      console.log('unblock = ', this.blockList);
      this.relations = await this.userService.getAllMyrelations(this.global.login as string);
      this.blockList = this.socialService.createBlockedList(this.relations);
      console.log('unblock = ', this.blockList);

    });

  }

  // onErrorInvitation() {
  //   this.socket.on('errorInvitation', (message: any) => {
  //     if (message.length > 0 && message[0].conv_id === this.currentConv.conv_id) {
  //       this.convMessages.splice(0, this.convMessages.length);
  //       this.convMessages = message;
  //     }
  //   });
  // }

  onInvitToPlay(type: string) {
    this.chatService.emission(
      'setInvitation',
      this.currentConv,
      this.currentConv.conv_id,
      {
        conv_id: this.currentConv.conv_id,
        logins_conv: this.currentConv.members,
        date: new Date(),
        content: "Invitation to start a game!",
        type: type,
        invitation: true,
      }
    );
  }

  onAcceptToPlay() {
    this.chatService.emission(
      'setInvitation',
      this.currentConv,
      this.currentConv.conv_id,
      {
        conv_id: this.currentConv.conv_id,
        logins_conv: this.currentConv.members,
        date: new Date(),
        content: "Invitation accepted!",
        type: undefined,
        invitation: false
      }
    );
  }

  onCancelToPlay() {
    this.chatService.emission(
      'unsetInvitation',
      this.currentConv,
      this.currentConv.conv_id,
      {
        conv_id: this.currentConv.conv_id,
        date: new Date(),
        content: "Invitation refused!",
        invitation: false
      }
    );
  }
  

  // onInvitToPlay() {
  //   this.chatService.invitToPlay(this.emission, this.currentConv);
  // }

  // onAcceptToPlay() {
  //   this.chatService.acceptToPlay(this.emission, this.currentConv);
  // }
  
  // onCancelToPlay() {
  //   this.chatService.cancelToPlay(this.emission, this.currentConv);
  // }










  // onInvitToPlay() {
  //   this.emission.data = {
  //     conv_id: this.currentConv.conv_id,
  //     logins_conv: this.currentConv.members,
  //     date: new Date(),
  //     content: "Invitation to start party!",
  //     invitation: true
  //   };
  //   this.emission.socketId = this.global.socketId as string;
  //   if (this.currentConv.name) {
  //     // this.socket.emit('message', this.emission);
  //     this.socket.emit('setInvitation', this.emission);
  //   }
  //   this.socket.on('launchgameInvitation', (game: any) => {
  //     this.router.navigate([`/pong/game/${game}`]);
  //   });
  // }

  // onAcceptToPlay() {
  //   this.emission.data = {
  //     conv_id: this.currentConv.conv_id,
  //     logins_conv: this.currentConv.members,
  //     date: new Date(),
  //     content: "Invitation accepted!",
  //     invitation: false
  //   };
  //   // this.socket.emit('takeInvitation', this.emission);
  //   this.socket.emit('setInvitation', this.emission);
  //   this.socket.on('launchgameInvitation', (game: any) => {
  //     console.log(game);
  //     this.router.navigate([`/pong/game/${game}`]);
  //   });
  // }
  
  // onCancelToPlay() {
  //   this.emission.data = {
  //     conv_id: this.currentConv.conv_id,
  //     date: new Date(),
  //     content: "Invitation refused!",
  //     invitation: false
  //   };
  //   this.socket.emit('unsetInvitation', this.emission);
  //   console.log("PASS CANCEL");
  // }

}
