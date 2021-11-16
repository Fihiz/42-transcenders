import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  static connected: boolean = false;
  static login: string | undefined = undefined;
  static socketId: string | undefined = undefined;
};