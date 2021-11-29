import { Component } from '@angular/core';
import { GlobalService } from './services/sf-global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public global: GlobalService) {}

  logOutHandleClick(event: Event) {
    this.global.login = undefined;
  }
}
