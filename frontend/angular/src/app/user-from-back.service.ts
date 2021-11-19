import { Injectable } from '@angular/core';
import { WebAppUserEntity } from './interfaces/user';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UserFromBackService {
  constructor() {}

  async getUser(): Promise<WebAppUserEntity> {
    try {
      const res = await axios.get('http://127.0.0.1:3000/user');
      const resData = res.data;
      console.log('Our result USER is: ', resData);
      return resData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getUsers(): Promise<WebAppUserEntity[]> {
    try {
      const res = await axios.get('http://127.0.0.1:3000/users');
      const resData = res.data;
      console.log('Our result USERS is: ', resData);
      return resData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

// OLD;
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { User } from './interfaces/user';
// import { Observable } from 'rxjs';

// const axios = require('axios');

// @Injectable({
//   providedIn: 'root',
// })
// export class UserFromBackService {
//   constructor(private http: HttpClient) {}

//   // httpOptions = {
//   //   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
//   // };

//   getUser(): Observable<User> {
//     const url = `localhost:3000`;
//     return this.http.get<User>(url); //.pipe(
//     //   tap((_) => this.log(`fetched hero id=${id}`)),
//     //   catchError(this.handleError<Hero>(`getHero id=${id}`))
//     // );
//   }
// }
