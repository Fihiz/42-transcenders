import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { if_message } from '../interfaces/if-message';
import { Socket } from "ngx-socket-io";
import { if_user } from '../interfaces/if-user';
import { GlobalService } from './sf-global.service';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
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

  readyToDisplayForm: boolean = false;

  constructor(public global: GlobalService,
              private router: Router,
              private socket: Socket) {}

  ngOnInit() {}

  async apiStatus(response: any): Promise<void> {
    if (response.isFound == 'found') {
      this.router.navigate(['/welcome']);
      this.user = response.data;
      this.global.login = response.data.login;
      this.socket.on('connect', () => {
        this.introduce(this.socket);
      });
      this.socket.connect();
    } else {
      console.log('response is :', response);
      document.getElementById('toOpenModal')?.click();
      await this.handleSubmitClick();

      this.fillUserInfos(response);
      this.registerBackInRequest(response);
    }
  }

  introduce(socket: Socket) {
    this.global.socketId = socket.ioSocket.id;
    const message: if_message = {
        id: socket.ioSocket.id,
        avatar: '',
        login: this.global.login as string,
        body: 'connection',
        to: ['nobody'],
        conv_id:0,
        date: new Date()
      }
      socket.emit('introduction', message);
  }

  async registerBackInRequest(response: any) {
    console.log("registerBackInRequest");
    try {
      const registerData = await axios.post(
        'http://127.0.0.1:3000/cb-auth/registerData',
        {
          data: this.user,
        }
      );
      if (registerData.data !== 'Successfully created')
        this.router.navigate(['/auth']);
      else {
        console.log(
          'the result of the registerData request is = ',
          registerData
        );
        this.global.login = response.data.login;
        this.socket.on('connect', () => {
          this.introduce( this.socket);
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
    console.log((<HTMLInputElement>document.getElementById('avatarUrl')).value);
    this.user.login = response.data.login;
    if (
      (<HTMLInputElement>document.getElementById('avatarUrl')).value ===
      '../../../assets/myIntraPictureBlack.png'
    ) {
      this.user.avatar = response.data.image_url;
    } else {
      this.user.avatar = (<HTMLInputElement>(
        document.getElementById('avatarUrl')
      )).value;
    }
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
          console.log('2- User clicked on submit !!!');
          resolve('OK');
        });
    });
  }
}
