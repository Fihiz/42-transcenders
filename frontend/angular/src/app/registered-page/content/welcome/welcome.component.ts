import { Component, OnInit, OnDestroy } from '@angular/core';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  status: OnlineStatusType = 1;
  subscription: Subscription = new Subscription();

  constructor(private onlineStatusService: OnlineStatusService) {}

  ngOnInit(): void {
    try {
      this.subscription.unsubscribe();
    }
    catch(error: any) {
      console.log(error);
    }
    this.subscription = this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      console.log('ici status = ', status);
      this.status = status;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
