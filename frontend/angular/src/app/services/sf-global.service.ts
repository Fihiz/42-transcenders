import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  login: string | undefined = undefined;
  socketId: string | undefined = undefined;
  doubleAuth: boolean = false;
  allUserStatus: Map<string, string> = new Map<string, string>();
  isBanned: boolean = false;
  constructor() {}
}
