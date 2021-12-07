import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { if_message } from './interfaces/if-message';
import { GlobalService } from './services/sf-global.service';
import { Socket } from 'ngx-socket-io';
import { UserService } from './services/sf-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(public global: GlobalService, public user: UserService, private socket: Socket, private router: Router) {}

  onLogOutHandleClick(event: Event) {
    const mess: if_message = {
      id: this.global.socketId,
      login: this.global.login as string,
      to:['nobody'],
      body:'loging-out',
      date: new Date(),
      conv_id: 0
    };
    this.socket.emit('log-out', mess);
  }
  
  ngOnInit(): void {
    this.socket.on('disconnection', () => {
      console.log('disconnection');
      this.socket.disconnect();
      this.router.navigate(['/']); // -> signaler a tt le monde
      this.global.login = undefined;
      this.user.user.status = 'offline';
    });
  }
}
