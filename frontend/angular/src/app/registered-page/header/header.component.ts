import { Component, OnInit } from '@angular/core';
import { if_user } from 'src/app/interfaces/if-user';
import { GlobalService } from 'src/app/services/sf-global.service';
import { UserService } from 'src/app/services/sf-user.service';
import { Socket } from 'ngx-socket-io';
import axios from 'axios';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  constructor(public userService: UserService, public global: GlobalService, private socket: Socket) {}

  async ngOnInit(): Promise<void> {
    this.userService.user.ranking = (
      await axios.get(
        `http://${window.location.host}:3000/cb-stats/getMyRanking/${this.userService.user.login}`
      )
    ).data.ranking;
    if (!this.userService.user.ranking)
        this.userService.user.ranking = 0;
    this.socket.on("points for ladder", (data: {points: number}) => {
      this.userService.user.points_for_ladder = data.points;
    });
    this.socket.on("ranking", (data: number) => {
      this.userService.user.ranking = data;
    });
  }
}
