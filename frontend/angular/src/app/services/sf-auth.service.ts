import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

import { GlobalService } from './sf-global.service';
import { UserService } from './sf-user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  constructor(
    public global: GlobalService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {}

  async getLoggedIn(): Promise<void> {
    const code: string = this.router.url.split('?')[1]?.substr(5, 64);
    try {
      const res = await axios.get('http://127.0.0.1:3000/cb-auth', {
        params: { code: code },
      });
      if (res.data.data === 'error') {
        console.log('error in getLoggedIn');
        this.router.navigate(['/']);
      }
      else {
        this.userService.apiStatus(res.data);
      }
    } 
    catch (error) {
      console.log('ngInit Auth error = ', error);
      this.router.navigate(['/auth']);
    }
  }
}
