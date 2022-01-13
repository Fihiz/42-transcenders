import { Component, OnInit, OnDestroy } from '@angular/core';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';
import { Subscription } from 'rxjs';
import { GlobalService } from 'src/app/services/sf-global.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  status: OnlineStatusType = 1;
  subscription: Subscription = new Subscription();

  constructor(private onlineStatusService: OnlineStatusService, public global: GlobalService) {}

  ngOnInit(): void {
    this.subscription.unsubscribe();
    this.subscription = this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      this.status = status;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
