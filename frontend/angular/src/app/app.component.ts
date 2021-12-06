import { Component, OnInit } from '@angular/core';
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
  constructor(public global: GlobalService, public user: UserService, private socket: Socket) {}

  onLogOutHandleClick(event: Event) {
    console.log('log-out front');
    const mess: if_message = {
      id: this.global.socketId,
      login: this.global.login as string,
      to:['nobody'],
      body:'loging-out',
      date: new Date(),
      conv_id: 0
    };
    console.log('test')
    this.socket.emit('log-out', mess);
    console.log('Status depuis app-component: ', this.user.user.status);
    // this.global.login = undefined;
    /* ! Requete a faire au back pour deconnecter */
  }
  
  ngOnInit(): void {
    console.log('ngOnInit');
    this.socket.on('disconnection', () => {
      console.log('disconnection');
      this.socket.disconnect();
      this.global.login = undefined;
      this.user.user.status = 'offline';
    });
  }
}
