import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from 'src/app/services/sf-game.service';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';
import { Socket } from "ngx-socket-io";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, OnDestroy {

  constructor(private onlineStatusService: OnlineStatusService, private gameService: GameService, private socket: Socket) {
    this.onlineStatusService.status.subscribe(async (status: OnlineStatusType) => {
      if (status === 0)
      {
        this.gameService.stopListen();

        this.gameService.stopDrawing();

        console.log('Offline');

        this.gameService.startListen2();
      }
      else
      {
        this.gameService.stopListen2();

        this.gameService.stopDrawing2();

        await this.socket.connect();

        this.gameService.emitLogin(0);

        console.log("Online");

        this.gameService.startListen();

        this.gameService.startDrawing();
      }
    });
  }

  ngOnInit() {
    this.gameService.emitLogin(0);

    this.gameService.startListen();

    this.gameService.startDrawing();
  }

  ngOnDestroy() {
    this.gameService.emitLogout();

    this.gameService.stopListen();

    this.gameService.stopDrawing();
  }

}
