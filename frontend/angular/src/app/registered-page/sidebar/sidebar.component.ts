import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalService } from 'src/app/services/sf-global.service';
import { Socket } from 'ngx-socket-io';
import { UserService } from 'src/app/services/sf-user.service';
import { Router } from '@angular/router';

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
    private user: UserService,
    private router: Router
  ) {}

  onLogOut(): void {
    this.handleLogOutClick.emit('event');
  }

  ngOnInit(): void {
    this.currentAppRole = this.user.user.app_role;

    this.socket.on('updatedUserGlobalRole', (data: any) => {
      if (
        this.user.user.app_role !== 'superadmin' &&
        this.global.login === data.login
      ) {
        this.currentAppRole = data.app_role;
        this.global.role = data.app_role;
      }
      /* Kind of guard : redirection if the user was a moderator and navigate on the component and becomes a user */
      if (
        this.currentAppRole !== 'moderator' &&
        this.router.url === '/profile/super-admin'
      )
        this.router.navigate(['/welcome']);
    });
  }
}
