import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/app/services/sf-global.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Output() handleLogOutClick = new EventEmitter();

  constructor(public global: GlobalService) { }

  onLogOut () {
    this.handleLogOutClick.emit('event');
  }
}
