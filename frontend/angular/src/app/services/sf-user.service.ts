import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { if_message } from '../interfaces/if-message';
import { Socket } from 'ngx-socket-io';
import { if_user } from '../interfaces/if-user';
import { GlobalService } from './sf-global.service';
import { BrowserModule } from '@angular/platform-browser';
// MERGE
// import * as Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: if_user = {
    login: '',
    pseudo: '',
    avatar: '',
    status: 'online',
    bio: '',
    pending_queue: false,
    banned: false,
    admonishement: 0,
    app_role: 'user',
    last_name: '',
    first_name: '',
    mail: '',
    created: new Date(),
    updated: new Date(),
  };

  avatarList: {
    alt: string;
    url: string;
  }[] = [
    {
      alt: 'My Intra Pic',
      url: '../../assets/profile-pictures/myIntraPictureBlack.png',
    },
    {
      alt: 'ageraud',
      url: 'https://cdn.intra.42.fr/users/large_ageraud.jpg',
    },
    {
      alt: 'sad-aude',
      url: 'https://cdn.intra.42.fr/users/large_sad-aude.jpg',
    },
    {
      alt: 'jobenass',
      url: 'https://cdn.intra.42.fr/users/large_jobenass.jpg',
    },
    {
      alt: 'lpieri',
      url: 'https://cdn.intra.42.fr/users/large_lpieri.jpg',
    },
    {
      alt: 'pgoudet',
      url: 'https://cdn.intra.42.fr/users/large_pgoudet.jpg',
    },
    {
      alt: 'rlepart',
      url: 'https://cdn.intra.42.fr/users/large_rlepart.jpg',
    },
  ];

  constructor(
    public global: GlobalService,
    private router: Router,
    private socket: Socket,
    private test: BrowserModule
  ) {}

  ngOnInit() {}

  async doubleAUth(login: string) {
    this.global.doubleAuth = (
      await axios.get(
        `http://${window.location.host}:3000/double-auth/isActivate`,
        { params: login }
      )
    ).data;
    console.log('double Auth = ', this.global.doubleAuth);
    if (this.global.doubleAuth === true) {
      const resp = (
        await axios.get(`http:/${window.location.host}:3000/double-auth`, {
          params: login,
        })
      ).data;
      console.log('code = ', resp);
      if (resp === 'ko') {
        alert('an error as occured when sending the mail');
        return 'ko';
      } else {
        let checkCode;
        do {
          checkCode = prompt(
            'Please enter the code (4 numbers) you received by mail for Double Authentification'
          );
        } while ((checkCode as string).length != 4);
        checkCode = Number(checkCode);
        return await axios.get(
          `http://${window.location.host}:3000/double-auth/check`,
          { params: checkCode }
        );
      }
    } else return 'ok';
  }

  async apiStatus(response: any): Promise<string> {
    const doubleAuthStatus = await this.doubleAUth(response.data.login);
    console.log('doubleAuth = ', doubleAuthStatus);
    if (doubleAuthStatus === 'ko') return 'ko';
    if (response.isFound == 'found') {
      this.router.navigate(['/welcome']);
      this.user = response.data;
      this.global.login = response.data.login;
      this.socket.on('connect', () => {
        this.introduce(this.socket);
      });
      this.socket.connect();
    } else {
      this.avatarList[0].url = response.data.image_url;
      document.getElementById('toOpenModal')?.click();
      await this.handleSubmitClick();
      this.fillUserInfos(response);
      this.registerBackInRequest(response);
    }
    return 'ok';
  }

  introduce(socket: Socket) {
    this.global.socketId = socket.ioSocket.id;
    const message: if_message = {
      id: socket.ioSocket.id,
      login: this.global.login as string,
      content: 'connection',
      to: ['nobody'],
      conv_id: 0,
      date: new Date(),
      avatar: '',
      role: '',
    };
    socket.emit('introduction', message);
  }

  async registerBackInRequest(response: any) {
    try {
      const registerData = await axios.post(
        `http://${window.location.host}:3000/cb-auth/registerData`,
        {
          data: this.user,
        }
      );
      if (registerData.data !== 'Successfully created')
        this.router.navigate(['/auth']);
      else {
        this.global.login = response.data.login;
        this.socket.on('connect', () => {
          this.introduce(this.socket);
        });
        this.socket.connect();
        this.router.navigate(['/welcome']);
      }
    } catch (error) {
      console.log('the registerData request failed with ', error);
      this.router.navigate(['/auth']);
    }
  }

  fillUserInfos(response: any): void {
    this.user.login = response.data.login;
    this.user.avatar = (<HTMLInputElement>(
      document.getElementById('avatarUrl')
    )).value;
    this.user.first_name = response.data.first_name;
    this.user.last_name = response.data.last_name;
    this.user.mail = response.data.email;
    this.user.pseudo = (<HTMLInputElement>(
      document.getElementById('pseudo')
    )).value;
    this.user.bio = (<HTMLInputElement>document.getElementById('bio')).value;
  }

  handleSubmitClick(): Promise<unknown> {
    return new Promise(function (resolve) {
      document
        .getElementById('submitId')
        ?.addEventListener('click', function () {
          resolve('OK');
        });
    });
  }
}
