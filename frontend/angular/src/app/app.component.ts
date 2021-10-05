import { Component } from '@angular/core';
const axios = require('axios');

// const client = new ClientOAuth2({
//   clientId: FORTYTWO_APP_ID,
//   clientSecret: FORTYTWO_APP_SECRET,
//   accessTokenUri: 'https://api.intra.42.fr/oauth/token',
//   authorizationUri: 'https://api.intra.42.fr/oauth/authorize',
//   redirectUri: 'http/127.0.0.1/3000/test',
//   scopes: ['notifications', 'gist']
// })

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isPassed=false;
  title = 'front-shrek';
  cheminImage: any = '../../img/background-shrek.jpeg';


  onInit() {

  }
}
