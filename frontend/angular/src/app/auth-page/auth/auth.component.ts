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
    await this.userService.getLoggedIn(); // maybe try catch
  }
}
