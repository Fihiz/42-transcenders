import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// Global is to get the login of the current connected user
export class GlobalService {
  static login: string | undefined = undefined;
  static socketId: string | undefined = undefined;
}
