import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from 'src/app/services/sf-game.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, OnDestroy {

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.gameService.emitLogin();

    this.gameService.startListen();

    this.gameService.startDrawing();
  }

  ngOnDestroy() {
    this.gameService.emitLogout();

    this.gameService.stopListen();

    this.gameService.stopDrawing();
  }

}
