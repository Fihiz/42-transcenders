import { Injectable } from '@angular/core';
import { User } from './interfaces/user';
import { Observable } from 'rxjs';
import axios from 'axios';
// import * as axios from 'axios';

// const axios = require('axios');

@Injectable({
  providedIn: 'root',
})
export class UserFromBackService {
  constructor() {}
  getUser1() {
    console.log('User 1 est ici');
  }
  async getUser(): Promise<User> {
    try {
      const res = await axios.get('http://127.0.0.1:3000');
      const resData = res.data;
      console.log('Our result is: ', resData);
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
