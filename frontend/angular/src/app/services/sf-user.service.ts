import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

import { if_user } from '../interfaces/if-user';
import { GlobalService } from './sf-global.service';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  user: if_user = {
    login: '',
    pseudo: '',
    avatar: '',
    status: '',
    bio: '',
    pending_queue: false,
    banned: false,
    admonishement: 0,
    app_role: '',
    created_web_app: new Date(),
    updated_web_app: new Date(),
    last_name: '',
    first_name: '',
    mail: '',
    created_api: new Date(),
    updated_api: new Date(),
  };

  constructor(public global: GlobalService, private router: Router) {}

  ngOnInit() {}

  async getLoggedIn(): Promise<void> {
    console.log(`URL is ${this.router.url}`);
    const code: string = this.router.url.split('?')[1]?.substr(5, 64);
    try {
      const res = await axios.get('http://127.0.0.1:3000/cb-auth', {
        params: { code: code },
      });

      const resData = res.data as unknown as any;
      this.fillUser(resData);
      this.router.navigate(['/welcome']); // Page for filling infos if first time
    } catch (error) {
      console.log('ngInit Auth error = ', error);
      this.router.navigate(['/']);
    }
  }

  fillUser(resData: any): void {
    this.global.login = resData.data.login;
    this.user.mail = resData.data.email;
    this.user.login = resData.data.login;
    this.user.pseudo = resData.data.login; // later
    this.user.avatar = resData.data.avatar;
    this.user.status = resData.data.status;
  }
}
