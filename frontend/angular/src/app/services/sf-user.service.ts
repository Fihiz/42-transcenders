import { Injectable, OnInit } from '@angular/core';
import { if_user } from '../interfaces/if-user';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  user: if_user = {
    login: '',
    pseudo: '',
    avatar: '',
    status: '',
    bio: '',
    pending_queue: false,
    banned: false,
    admonishement: 0,
    app_role: '',
    created_web_app: new Date(),
    updated_web_app: new Date(),
    last_name: '',
    first_name: '',
    mail: '',
    created_api: new Date(),
    updated_api: new Date(),
  };

  constructor() {}

  ngOnInit() {}

  async getUser(): Promise<if_user> {
    try {
      const res = await axios.get('http://127.0.0.1:3000/cb-user');
      const resData = res.data;
      console.log('Our result USER is: ', resData);
      console.log(resData);
      return resData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
