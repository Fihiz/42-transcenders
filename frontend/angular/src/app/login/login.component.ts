import { Component, OnInit } from '@angular/core';
const FORTYTWO_APP_ID = '4d5d28ff9d7de95a5193fdc23e41e968fb338bee441891bd99950308ef326a88';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login?: string;
  constructor() { }

  async onEvent() {
    const client_id=FORTYTWO_APP_ID;
    const redirect_uri="http://127.0.0.1:80/auth/";
    const response_type="code";
    const state='enrfckqgilRbvr!XCWegret1@g30rt3h5/46+=40ethjr4j';
    const url="https://api.intra.42.fr/oauth/authorize?client_id="+client_id+"&redirect_uri="+redirect_uri+"&response_type="+response_type+ "&state=" + state;
    window.location.href = url;
  }

  ngOnInit(): void {
  }

}
