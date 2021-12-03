import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

import { if_user } from '../interfaces/if-user';
import { GlobalService } from './sf-global.service';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  user: if_user = {
    login: '',
    pseudo: '',
    avatar: '',
    status:
      'online' /* If we pass here, it means user is looking for connection so... */,
    bio: '',
    pending_queue: false,
    banned: false,
    admonishement: 0,
    app_role: 'user' /* ? */,
    created_web_app: new Date(), // to remove
    updated_web_app: new Date(), // to remove
    last_name: '',
    first_name: '',
    mail: '',
    created_api: new Date(), // to rename created
    updated_api: new Date(), // to rename updated
  };

  constructor(public global: GlobalService, private router: Router) {}

  ngOnInit() {}

  async apiStatus(response: any): Promise<void> {
    console.log('response is :', response);

    if (response.isFound == 'found') {
      this.user = response.data;
      this.global.login = response.data.login;
    }
    else {
      document.getElementById('toOpenModal')?.click();
      await this.handleSubmitClick();

      this.fillUserInfos(response);
      this.registerBackInRequest(response);
    }
  }

  async registerBackInRequest(response: any) {
    try {
      const registerData = await axios.post('http://127.0.0.1:3000/cb-auth/registerData', {
        data: this.user,
      });
      console.log(registerData)
      if (registerData.data !== 'Successfully created')
        this.router.navigate(['/auth']);
      else {
      console.log('the result of the registerData request is = ', registerData);
      this.global.login = response.data.login; /* Registered-page condition */
      this.router.navigate(['/auth']);
      }
    }
    catch (error) {
      console.log('the registerData request failed with ', error);
      this.router.navigate(['/auth']);
    }
  }

  fillUserInfos(response : any) : void {
    this.user.login = response.data.login;
    this.user.avatar = response.data.image_url; /* May be changed from form later ? */
    this.user.first_name = response.data.first_name;
    this.user.last_name = response.data.last_name;
    this.user.mail = response.data.email;
    this.user.pseudo = (<HTMLInputElement>(
      document.getElementById('pseudo')
      )).value;
      this.user.bio = (<HTMLInputElement>document.getElementById('bio')).value;
      console.log('Final user is: ', this.user);

  }

  handleSubmitClick(): Promise<unknown> {
    return new Promise(function (resolve) {
      document
        .getElementById('submitId')
        ?.addEventListener('click', function () {
          console.log('2- User clicked on submit !!!');

          resolve('OK'); /* ? */
        });
        /* reject */
        // check unique pseudo
    });
  }
}
