import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/sf-user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    console.log(`URL is ${this.router.url}`);
    const code: string = this.router.url.split('?')[1]?.substr(5, 64);
    try {
      await this.userService.getLoggedIn(code);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
