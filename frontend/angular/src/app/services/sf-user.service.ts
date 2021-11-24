import { Injectable } from '@angular/core';
import { if_user } from '../interfaces/if-user';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // user?: if_user; // demander pk a Romain ?

  constructor() {}

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
