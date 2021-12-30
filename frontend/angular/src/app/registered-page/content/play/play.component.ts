import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent {

  constructor(private router: Router) {}

  submit() {
    const gameId: string = (<HTMLInputElement>document.getElementById('gameId')).value;
    if (gameId.search(/\D+/) != -1 || gameId[0] == '0' || gameId.length === 0)
      (<HTMLInputElement>document.getElementById('gameId')).value = '';
    else
      this.router.navigate([`/pong/game/${gameId}`]);
  }
}
