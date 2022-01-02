import { Component, OnInit } from '@angular/core';
import axios from "axios"
import { GlobalService } from 'src/app/services/sf-global.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constructor(private global: GlobalService) {}
  private activate = 'activate';

  async onDoubleAuth() {
    const doubleAuth = (await axios.get("http://127.0.0.1:3000/double-auth/activate/", { params: {login: this.global.login, status: this.activate}})).data;
    if (doubleAuth === 'ok') {
      this.activate = this.activate === 'activate' ? 'deactivate' : 'activate';
      this.global.doubleAuth = this.global.doubleAuth === true ? false : true;
    }
  }

}
