import { Component, OnInit } from '@angular/core';
import { OnlineStatusService, OnlineStatusType } from 'ngx-online-status';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  status: OnlineStatusType = 1;

  constructor(private onlineStatusService: OnlineStatusService) {
    this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      this.status = status;
    });
  }

  ngOnInit(): void {
  }

}
