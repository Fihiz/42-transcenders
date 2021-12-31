import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  login: string | undefined = undefined;
  socketId: string | undefined = undefined;
  doubleAuth: boolean = false;
  constructor() {}
}
