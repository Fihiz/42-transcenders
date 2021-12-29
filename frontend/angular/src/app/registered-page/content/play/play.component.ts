import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from 'src/app/services/sf-game.service';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';
import { Socket } from "ngx-socket-io";
import { Router } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit, OnDestroy {

  // subscription: Subscription = new Subscription;

  constructor(private router: Router, private onlineStatusService: OnlineStatusService, private gameService: GameService, private socket: Socket) {
  }

  ngOnInit() {
    // this.subscription.unsubscribe();
    // this.subscription = this.onlineStatusService.status.subscribe(async (status: OnlineStatusType) => {
    //   if (status === 0)
    //   {
    //     this.gameService.stopListen();

    //     this.gameService.stopDrawing();

    //     console.log('Offline');

    //     this.gameService.startListen2();
    //   }
    //   else
    //   {
    //     this.gameService.stopListen2();

    //     this.gameService.stopDrawing2();

    //     await setTimeout(() => {
    //       this.gameService.emitLogin(0);
    //     }, 4000);
  
    //       console.log("Online");
  
    //       this.gameService.startListen();
  
    //       this.gameService.startDrawing();
    //   }
    // });

    // this.gameService.emitLogin(0);

    // this.gameService.startListen();

    // this.gameService.startDrawing();
  }

  submit() {
    const gameId: string = (<HTMLInputElement>document.getElementById('gameId')).value;
    if (gameId.search(/\D+/) != -1 || gameId[0] == '0')
      (<HTMLInputElement>document.getElementById('gameId')).value = '';
    else
      this.router.navigate([`/pong/game/${gameId}`]);
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();

    // this.gameService.emitLogout();

    // this.gameService.stopListen();

    // this.gameService.stopDrawing();
  }

}
