import { Component, OnInit } from '@angular/core';
import { WebAppUserEntity } from 'src/app/interfaces/user';
import { UserFromBackService } from 'src/app/user-from-back.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: WebAppUserEntity = {
    login: 'patrice',
    pseudo: '',
    avatar: '',
    status: '',
    bio: '',
    pending_queue: false,
    banned: false,
    admonishement: 0,
    app_role: '',
    created: new Date(),
    updated: new Date(),
  };

  users: WebAppUserEntity[] = [];

  constructor(private userService: UserFromBackService) {}

  async ngOnInit(): Promise<void> {
    console.log('inited');
    try {
      this.user = await this.userService.getUser();
      console.log(this.user.login);
    } catch (error) {
      console.log(error);
      throw error;
    }
    try {
      this.users = await this.userService.getUsers();
      console.log(this.user.login);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
