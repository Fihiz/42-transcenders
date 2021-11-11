import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    isAuth: boolean = false;

    appHandleClick(event: Event) {
      console.log('grandma knows you clicked')
      this.isAuth = false;
    }
}
