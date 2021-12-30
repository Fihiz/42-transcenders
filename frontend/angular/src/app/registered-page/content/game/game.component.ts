import { Component, OnInit, Input } from '@angular/core';
import { if_game_object } from 'src/app/interfaces/if-game';
import { GameService } from 'src/app/services/sf-game.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  party?: if_game_object; 

  constructor(private gameService: GameService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getParty();
  }

  async getParty() {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    const response = await this.gameService.getPartyById(id);
    this.party = response;
  }

}
