import { Component } from '@angular/core';
import { GlobalService } from './services/sf-global.service';
import { UserService } from './services/sf-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public global: GlobalService, public user: UserService) {}

  logOutHandleClick(event: Event) {
    console.log('Status depuis app-component: ', this.user.user.status);
    this.global.login = undefined;
    /* ! Requete a faire au back pour deconnecter */
    this.user.user.status = 'offline';
  }
}
