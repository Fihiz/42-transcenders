import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  
  /* OLD */
  // isAuth: boolean = false;

  // appHandleClick(event: Event) {
  //   this.isAuth = false;
  // }

  login? : string;
  constructor() {}

}
