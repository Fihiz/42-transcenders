import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { GlobalService } from 'src/app/services/sf-global.service';

@Component({
  selector: 'app-double-auth',
  templateUrl: './double-auth.component.html',
  styleUrls: ['./double-auth.component.css'],
})
export class DoubleAuthComponent {
  public activate;
  constructor(private global: GlobalService) {
    this.activate = this.global.doubleAuth === true ? 'deactivate' : 'activate';
  }

  async onDoubleAuth() {
    // CHAT
    // console.log(this.global.doubleAuth);
    // const doubleAuth = (
    //   await axios.get('http://127.0.0.1:3000/double-auth/activate/', {
    //     params: { login: this.global.login, status: this.activate },
    //   })
    // ).data;
    // PONG
    const doubleAuth = (
      await axios.get(
        `http://${window.location.host}:3000/double-auth/activate/`,
        { params: { login: this.global.login, status: this.activate } }
      )
    ).data;
    if (doubleAuth === 'ok') {
      this.activate = this.activate === 'activate' ? 'deactivate' : 'activate';
      this.global.doubleAuth = this.global.doubleAuth === true ? false : true;
    }
  }
}
