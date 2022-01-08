import { Component, OnInit, OnDestroy } from '@angular/core';

import { GameService } from 'src/app/services/sf-game.service';
import { if_game_object, if_game_type } from 'src/app/interfaces/if-game';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, OnDestroy {

  sets: if_game_type[] = [];
  selected: string | undefined = undefined;
  play: if_game_object | null = null;

  time: number = 0;
  intervalId: number | null = null;

  constructor(private gameService: GameService, private router: Router, private socket: Socket) { }

  ngOnInit() {
    this.socket.on('isInPendingQueue', (body: any) => {
      this.selected = body.selected;
    });
    this.socket.emit('isInPendingQueue', this.socket.ioSocket.id);
    this.getDisplay();
  }
  
  ngOnDestroy() {
    this.socket.removeAllListeners('isInPendingQueue');
    this.unsetParty();
  }

  setParty(type: string) {
    this.selected = type;
    this.gameService.emitReadyForPlay(type);
  }
  
  unsetParty() {
    this.selected = undefined;
    this.gameService.emitCancelForPlay();
  }

  async getDisplay() {
    await this.getPlayParty();
    if (this.play)
      this.router.navigate([`/pong/game/${this.play.game_id}`]);
    await this.getSetsParty();
  }

  async getPlayParty() {
      this.play = await this.gameService.getPartyByLogin();
  }

  async getSetsParty() {
      this.sets = await this.gameService.getTypesOfParty();
  }

  // countDown() {
  //   this.intervalId = setInterval(() => {
  //     this.time++;
  //   }, 1000);
  // }

}
