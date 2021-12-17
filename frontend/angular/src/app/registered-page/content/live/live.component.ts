import { Component, OnInit } from '@angular/core';

import { if_game, if_game_object } from 'src/app/interfaces/if-game';
import { GameService } from 'src/app/services/sf-game.service'

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {

  parties: if_game_object[] = [];
  size: number = 0;

  constructor(private gameService: GameService ) { }

  ngOnInit(): void {
    this.getLives();
  }

  async getLives() {
      this.parties = await this.gameService.getParties();
      this.size = this.parties.length;
  }

}
