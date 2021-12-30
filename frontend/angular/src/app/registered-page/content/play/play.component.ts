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
  waiting: boolean = false;

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit() {
    this.getDisplay();
  }

  async getDisplay() {
    await this.getPlayParty();
    await this.getSetsParty();
  }

  async getPlayParty() {
    this.play = await this.gameService.getPartyByLogin();
    if (this.play)
      this.CountDown();
  }

  async getSetsParty() {
    this.sets = await this.gameService.getTypesOfParty();
  }

  async setParty(type: string) {
    this.play = await this.gameService.setParty(type)
    if (this.play)
      this.CountDown();
  }

  CountDown() {
    if (this.play)
      this.time = Math.round((((new Date(this.play.updated).getTime() - Date.now()) + 10000) / 1000));
    this.waiting = true;

    // Compte-à-rebourd
    this.intervalId = setInterval(() => {
      this.time--;
      if (this.time <= 0) {
        this.deleteCountDown();
        if (this.play) {
          this.gameService.getPartyById(this.play.game_id)
          .then((response) => {
            if (this.play && response.player2 !== null)
              this.router.navigate([`./pong/game/${this.play.game_id}`]);
            else if (this.play && response.player2 === null)
              this.gameService.deletePartyById(this.play.game_id);
          })
        }
      }
    }, 1000);

    // 
    // this.intervalId = setTimeout(() => {
    //   console.log("OK");
    //   console.log(this.time);
    //   this.time--;
    //   this.deleteCountDown();
    // }, this.time);
    // this.deleteCountDown();
  }

  deleteCountDown() {
    clearInterval(this.intervalId);
    this.time = -1;
    this.waiting = false;
  }

  ngOnDestroy() {
    this.deleteCountDown();
  }

}
