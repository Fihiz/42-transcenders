import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  static test:string = "test";
  connected: boolean = false;
  login: string = 'login';
};