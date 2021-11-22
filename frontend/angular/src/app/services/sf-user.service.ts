import { Injectable } from '@angular/core';
import { if_user } from '../interfaces/if-user';

@Injectable({
  providedIn: 'root',
})
export class SfUserService {
  user?: if_user;

  constructor() {}
}
