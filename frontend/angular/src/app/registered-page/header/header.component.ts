import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserFromBackService } from 'src/app/user-from-back.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: User = {
    avatar: '',
    login: '',
    pseudo: '',
    points_for_ladder: 0,
    scored_points: 0,
    created: new Date(),
    updated: new Date(),
  };

  constructor(private userService: UserFromBackService) {}

  ngOnInit(): void {
    console.log('inited');
    this.userService.getUser().subscribe((user: User) => (this.user = user));
  }
}
