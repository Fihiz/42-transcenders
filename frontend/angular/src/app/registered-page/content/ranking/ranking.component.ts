import { Component, OnInit } from '@angular/core';

import { if_stats, if_stats_object } from 'src/app/interfaces/if-stats';
import { StatsService } from 'src/app/services/sf-stats.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  scores: if_stats_object[] = [];
  size: number = 0;

  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.getRanking();
  }

  async getRanking() {
    this.scores = await this.statsService.getScores();
    this.size = this.scores.length;
  }

}
