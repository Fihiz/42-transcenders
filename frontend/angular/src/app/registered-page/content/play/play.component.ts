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
  shields: Map<string, boolean> = new Map<string, boolean>();

  constructor(private gameService: GameService, private router: Router, private socket: Socket) { }

  ngOnInit() {
    this.socket.on('isInPendingQueue', (body: any) => {
      if (body.navigate)
      {
        const nav: string = body.navigate;
        this.router.navigate([nav]);
      }
      else
        this.selected = body.selected;
    });
    this.socket.emit('isInPendingQueue', { id: this.socket.ioSocket.id });
    this.getDisplay();
  }
  
  ngOnDestroy() {
    this.socket.emit('leavingPlay', { id: this.socket.ioSocket.id });
    this.socket.removeAllListeners('isInPendingQueue');
  }

  setShield(type: string) {
    this.shields.set(type, !this.shields.get(type));
  }

  setParty(type: string) {
    this.selected = type;
    this.gameService.emitReadyForPlay(type, this.shields.get(type) || false);
    this.shields.forEach((shield, key) => this.shields.set(key, false));
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
      this.sets.forEach(set => {
        this.shields.set(set.type, false);
      });
  }

  // countDown() {
  //   this.intervalId = setInterval(() => {
  //     this.time++;
  //   }, 1000);
  // }

}
