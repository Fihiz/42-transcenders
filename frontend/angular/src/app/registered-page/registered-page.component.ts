import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from '../services/sf-global.service';

@Component({
  selector: 'app-registered-page',
  templateUrl: './registered-page.component.html',
  styleUrls: ['./registered-page.component.css'],
})
export class RegisteredPageComponent {
  @Output() notifyAppComponent = new EventEmitter();

  constructor(private global: GlobalService ) {}

  sidebarLogOutEvent(event: Event) {
    this.notifyAppComponent.emit('event');
  }

  onSubmitCode() {
    this.global.doubleAuth === false;
  }

}
