import { Injectable } from '@angular/core';
import { if_stats } from '../interfaces/if-stats';

@Injectable({
  providedIn: 'root',
})
export class SfStatsService {
  stats?: if_stats;

  constructor() {}
}
