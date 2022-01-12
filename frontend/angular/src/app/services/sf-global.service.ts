import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  pseudo: string | undefined = undefined;
  login: string | undefined = undefined;
  socketId: string | undefined = undefined;
  doubleAuth: boolean = false;
  allUserStatus: Map<string, string> = new Map<string, string>();
  allUserBio: Map<string, string> = new Map<string, string>();
  allUserAvatar: Map<string, string> = new Map<string, string>();
  allUserPseudo: Map<string, string> = new Map<string, string>();
  isBanned: boolean = false;
  role: string = 'chatter';
  constructor() {}
}
