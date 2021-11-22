import { Component, OnInit } from '@angular/core';
import { if_user } from 'src/app/interfaces/if-user';
import { UserService } from 'src/app/services/sf-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
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

  constructor(private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.user = await this.userService.getUser();
      console.log(this.user.login);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
