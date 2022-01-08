import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/app/services/sf-global.service';
import { Socket } from 'ngx-socket-io';
import { UserService } from 'src/app/services/sf-user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Output() handleLogOutClick = new EventEmitter();

  currentAppRole: string = '';

  constructor(
    private socket: Socket,
    public global: GlobalService,
    private user: UserService
  ) {}

  onLogOut(): void {
    this.handleLogOutClick.emit('event');
  }

  ngOnInit(): void {
    this.currentAppRole = this.user.user.app_role;
    console.log(`role: ${this.currentAppRole}`);
    // this.socket.on('updateAppRole', (data: any) => {
    //   this.appRole = data;
    //   console.log('appRole', data);
    //   // this.listConv = data as Array<if_conversation>;
    // });
  }
}
