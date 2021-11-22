import { Injectable } from '@angular/core';
import { if_social } from '../interfaces/if-social';

@Injectable({
  providedIn: 'root',
})
export class SocialService {
  social?: if_social;

  constructor() {}
}
