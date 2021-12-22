import { Component, ViewChild } from '@angular/core';
import { NgxTypedJsComponent } from 'ngx-typed-js';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent {
	@ViewChild(NgxTypedJsComponent) typed: NgxTypedJsComponent | undefined;
  constructor() {}

  onRegister() {
    console.log('User clicked on register');
    const clientId = '433f62b085e15cdb9994c692a7fc5af7e43eb3ca173bae63a421b26fa176c29a';
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
