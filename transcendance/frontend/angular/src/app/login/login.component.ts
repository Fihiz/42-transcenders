import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from '../chat/message.model';
import { GlobalService } from '../globales.service';
import { LoginService } from './login.service';
const FORTYTWO_APP_ID = '4d5d28ff9d7de95a5193fdc23e41e968fb338bee441891bd99950308ef326a88';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  login = GlobalService.login;
  constructor(private router: Router, private LoginService: LoginService) {}

  onLogOut() {
    console.log('log-out front');
    const mess: Message = {
      id:this.LoginService.getSocket().ioSocket.id,
      login: GlobalService.login as string,
      to:['nobody'],
      body:'loging-out',
      date: new Date(),
      conv_id: 0
    };
    this.LoginService.getSocket().emit('log-out', mess);
  }

  onChatRedirection() {
    this.router.navigate(['/chat']);
  }

  async onEvent() {
    const client_id=FORTYTWO_APP_ID;
    const redirect_uri="http://127.0.0.1:80/auth/";
    const response_type="code";
    const state='enrfckqgilRbvr!XCWegret1@g30rt3h5/46+=40ethjr4j';
    const url="https://api.intra.42.fr/oauth/authorize?client_id="+client_id+"&redirect_uri="+redirect_uri+"&response_type="+response_type+ "&state=" + state;
    window.location.href = url;
  }

  ngOnInit(): void {
    this.LoginService.getSocket().on('disconnection', () => {
      this.LoginService.getSocket().disconnect();
      GlobalService.connected = false;
      GlobalService.login = undefined;
      this.login = undefined;
    });
  }
}
