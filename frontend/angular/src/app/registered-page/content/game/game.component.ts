import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/services/sf-game.service';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription;

  constructor(private onlineStatusService: OnlineStatusService, private gameService: GameService, private route: ActivatedRoute, private router: Router) {}

  navigate(str: string) {
  }

  ngOnInit() {
    this.subscription.unsubscribe();
    this.subscription = this.onlineStatusService.status.subscribe(async (status: OnlineStatusType) => {
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

        await setTimeout(() => {
          this.gameService.emitLogin(Number(this.route.snapshot.paramMap.get('id')));
        }, 4000);
        
        
        this.gameService.startListen();
    
        this.gameService.startDrawing();
      }
    });
    const gameId: string | null = this.route.snapshot.paramMap.get('id');
    if (!gameId || (gameId.search(/\D+/) != -1))
    {
      this.router.navigate(['/pong/live']);
      return ;
    }
    else
      this.gameService.emitLogin(Number(gameId));

    this.gameService.startListen();

    this.gameService.startDrawing();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

    this.gameService.emitLogout();

    this.gameService.stopListen();

    this.gameService.stopDrawing();
  }

}
