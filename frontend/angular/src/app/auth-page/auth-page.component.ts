import { Component } from '@angular/core';
const FORTYTWO_APP_ID =
  '4d5d28ff9d7de95a5193fdc23e41e968fb338bee441891bd99950308ef326a88';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent {
  constructor() {}

  onRegister() {
    console.log('User clicked on register');
    const clientId = FORTYTWO_APP_ID;
    const redirectUri = 'http://127.0.0.1:80/auth/';
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
