import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/sf-global.service';
import { Router } from '@angular/router';
import axios from 'axios';
import { UserService } from 'src/app/services/sf-user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(
    public global: GlobalService,
    private userService: UserService,
    private router: Router
  ) {}

  fillUser(resData: any): void {
    this.global.login = resData.data.login;
    this.userService.user.mail = resData.data.email;
    this.userService.user.login = resData.data.login;
    this.userService.user.pseudo = resData.data.login; // later
    this.userService.user.avatar = resData.data.image_url;
  }

  async ngOnInit(): Promise<void> {
    console.log(`URL is ${this.router.url}`);
    const code = this.router.url.split('?')[1]?.substr(5, 64);
    try {
      const res = await axios.get('http://127.0.0.1:3000/cb-auth', {
        params: { code: code },
      }); // Do the request from the component or move it into service as UserService
      const resData = res.data as unknown as any;
      this.fillUser(resData);
      this.router.navigate(['/welcome']); // Page for filling infos if first time
    } catch (error) {
      console.log('ngInit Auth error = ', error);
      this.router.navigate(['/']);
    }
  }
}
