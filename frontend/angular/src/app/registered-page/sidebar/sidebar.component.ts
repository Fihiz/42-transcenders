import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Output() handleLogOutClick = new EventEmitter();

  constructor() { }

  onLogOut () {
    this.handleLogOutClick.emit('event');
  }
}
