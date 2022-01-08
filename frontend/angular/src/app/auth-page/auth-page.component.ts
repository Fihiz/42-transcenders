import { Component } from '@angular/core';
import { GlobalService } from '../services/sf-global.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent {
  constructor(public global: GlobalService) {}
  // doubleAuth = this.global.doubleAuth;

  onDoubleAuth() {
    console.log(`code received`);
  }
  onRegister() {

    const knownHost: string[] = [
      "10.4.3.7",
      "10.4.3.5",
      "10.4.3.3",
      "10.4.3.1",
      "10.4.4.7",
      "10.4.4.5",
      "10.4.4.3",
      "10.4.4.1",
      "10.4.5.7",
      "10.4.5.5",
      "10.4.5.3",
      "10.4.5.1",
    ];

    console.log('User clicked on register');
    let redirectUri;
    if (knownHost.find(str => str === window.location.host))
      redirectUri = `http://${window.location.host}:80/auth/`;
    else
      redirectUri = 'http://127.0.0.1:80/auth/';
    const clientId = 'd13f8d3b287c4cb4ffa5e23f265383e2e33b4e0b0370efa35d0c36e3da0cb988';
    const responseType = 'code';
    const state = 'enrfckqgilRbvr!XCWegret1@g30rt3h5/46+=40ethjr4j';
    const url =
      'https://api.intra.42.fr/oauth/authorize?client_id=' +
      clientId +
      '&redirect_uri=' +
      redirectUri +
      '&response_type=' +
      responseType +
      '&state=' +
      state;
    window.location.href = url; // Keeping it into the component or a dedicated service ?
  }
}
