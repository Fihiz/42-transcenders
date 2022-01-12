import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { GlobalService } from '../services/sf-global.service';

@Component({
  selector: 'app-registered-page',
  templateUrl: './registered-page.component.html',
  styleUrls: ['./registered-page.component.css'],
})
export class RegisteredPageComponent implements OnInit, OnDestroy {
  @Output() notifyAppComponent = new EventEmitter();

  constructor(private socket: Socket, private global: GlobalService) {}

  ngOnInit() {
    this.socket.on('status', (message: { login: string, status: string }) => {
      this.global.allUserStatus.set(message.login, message.status);
    });
    this.socket.on('profileUpdate', (message: { login: string, avatar: string, bio: string, pseudo: string }) => {
      this.global.allUserAvatar.set(message.login, message.avatar.replace("localhost:3000", window.location.host + ":3000"));
      this.global.allUserPseudo.set(message.login, message.pseudo);
      this.global.allUserBio.set(message.login, message.bio);
    });
  }

  ngOnDestroy() {
    this.socket.removeAllListeners('status');
  }

  sidebarLogOutEvent(event: Event) {
    this.notifyAppComponent.emit('event');
  }

  onSubmitCode() {
    this.global.doubleAuth === false;
  }
}
