import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  /* OLD */
  // isAuth: boolean = false;

  login? : string;
  constructor() {}

  logOutHandleClick(event: Event) {
    this.login = undefined;
  }

}
