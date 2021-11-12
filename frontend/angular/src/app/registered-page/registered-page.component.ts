import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-registered-page',
  templateUrl: './registered-page.component.html',
  styleUrls: ['./registered-page.component.css'],
})
export class RegisteredPageComponent {
  @Output() notifyAppComponent = new EventEmitter();

  constructor() {}

  sidebarLogOutEvent(event: Event) {
    this.notifyAppComponent.emit('event');
  }
}
