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

  async ngOnInit(): Promise<void> {
    console.log(`URL is ${this.router.url}`);
    const code = this.router.url.split('?')[1]?.substr(5, 64);
    try {
      const res = await axios.get('http://127.0.0.1:3000/cb-auth', {
        params: { code: code },
      });
      const resData = res.data as unknown as any;
      // this.fillUser(resData.data);
      this.global.login = resData.data.login;
      this.userService.user.mail = resData.data.email;
      this.userService.user.login = resData.data.login;
      console.log('data result is : ', resData);
      console.log(
        `the login is : ${resData.data.login}\nThe email address : ${resData.data.email}`
      );
      this.router.navigate(['/welcome']);
    } catch (error) {
      console.log('ngInit Auth error = ', error);
      this.router.navigate(['/']);
    }
  }
}
