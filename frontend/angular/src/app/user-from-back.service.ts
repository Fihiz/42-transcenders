import { Injectable } from '@angular/core';
import { User } from './interfaces/user';
import { Observable } from 'rxjs';

import * as axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UserFromBackService {
  constructor() {}
}







// OLD
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