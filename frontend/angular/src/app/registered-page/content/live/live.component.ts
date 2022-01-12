import { Component, OnInit } from '@angular/core';

import { if_game_object } from 'src/app/interfaces/if-game';
import { GameService } from 'src/app/services/sf-game.service'
import { GlobalService } from 'src/app/services/sf-global.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {

  parties: if_game_object[] | undefined = [];
  size: number = 0;

  constructor(private gameService: GameService, public global: GlobalService  ) { }

  ngOnInit(): void {
    this.getLives();
  }

  async getLives() {
    console.log("ROMAIN")
      this.parties = await this.gameService.getPartiesInProgress();
      if (this.parties !== undefined)
        this.size = this.parties.length;
  }

}
