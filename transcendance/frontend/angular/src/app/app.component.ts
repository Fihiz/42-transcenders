import { Component } from '@angular/core';
const axios = require('axios');


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(){}
  isPassed=false;
  title = 'front-shrek';
  cheminImage: any = '../../img/background-shrek.jpeg';
  
}
