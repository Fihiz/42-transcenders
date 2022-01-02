import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { if_social } from '../interfaces/if-social';
import { GlobalService } from './sf-global.service';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class SocialService {
  social?: if_social;

  constructor(private global: GlobalService, private socket: Socket) {}

  
}
