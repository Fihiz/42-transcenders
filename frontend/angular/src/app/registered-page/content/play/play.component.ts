import { Component, OnInit, OnDestroy } from '@angular/core';

import { GameService } from 'src/app/services/sf-game.service';
import { if_game_object, if_game_type } from 'src/app/interfaces/if-game';

import { Router } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, OnDestroy {

  play?: if_game_object;
  sets: if_game_type[] = [];
  time: number = -1;
  intervalId?: number;
  test?: number;
  waiting: boolean = false;

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit() {
    this.getDisplay();
  }

  ngOnDestroy() {
    this.deleteCountDown();
  }

  async getDisplay() {
    await this.getPlayParty();
    await this.getSetsParty();
  }

  async getPlayParty() {
    this.play = await this.gameService.getPartyByLogin();
    if (this.play) {
      this.countDown();
      this.timer();
    }
  }

  async getSetsParty() {
    if (!this.play)
      this.sets = await this.gameService.getTypesOfParty();
  }

  async setParty(type: string) {
    this.play = await this.gameService.setParty(type)
    if (this.play) {
      this.countDown();
      this.timer();
    }
  }

  countDown() {
    if (this.play)
      this.time = Math.round((((new Date(this.play.updated).getTime() - Date.now()) + 10000) / 1000));
    if(this.time <= 0)
      this.time = 0;
    if (this.time > 0) {
      this.waiting = true;
      this.intervalId = setInterval(() => {
        this.time--;
        if (this.time <= 0) {
          this.deleteCountDown();
          this.waiting = false;
        }
      }, 1000);
    }
  }

  timer() {
    this.test = setTimeout(() => {
      if (this.play) {
        this.gameService.getPartyById(this.play.game_id)
        .then((response) => {
          if (this.play && response.player2 !== null)
            this.router.navigate([`./pong/game/${this.play.game_id}`]);
          else if (this.play && response.player2 === null)
            this.gameService.deletePartyById(this.play.game_id);
        })
        .catch((error) => {
          console.log("PASS");
        })
        // this.deleteCountDown();
        clearTimeout(this.test);
        this.time = -1;
      }
    }, this.time * 1000);
  }

  deleteCountDown() {
    clearInterval(this.intervalId);
    clearTimeout(this.test);
    this.time = -1;
  }

}
