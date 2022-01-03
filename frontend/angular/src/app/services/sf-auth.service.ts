import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';


import { GlobalService } from './sf-global.service';
import { UserService } from './sf-user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService{
  constructor(
    public global: GlobalService,
    private userService: UserService,
    private router: Router
  ) {}



  async getLoggedIn(): Promise<void> {
    const code: string = this.router.url.split('?')[1]?.substr(5, 64);
    try {
      const res = await axios.get(`http://${window.location.host}:3000/cb-auth`, {
        params: { code: code, host: window.location.host },
      });
      if (res.data.data === 'error') {
        console.log('error in getLoggedIn');
        this.router.navigate(['/']);
      }
      else 
        if (await this.userService.apiStatus(res.data) !== 'ok')
          this.router.navigate(['/']);
    } 
    catch (error) {
      console.log('ngInit Auth error = ', error);
      this.router.navigate(['/auth']);
    }
  }
}

