import { Injectable } from '@angular/core';
import { if_game } from '../interfaces/if-game';

@Injectable({
  providedIn: 'root',
})
export class SfGameService {
  game?: if_game;

  constructor() {}
}
