import { Injectable } from '@angular/core';
import { if_stats } from '../interfaces/if-stats';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  stats?: if_stats;

  constructor() {}
}
