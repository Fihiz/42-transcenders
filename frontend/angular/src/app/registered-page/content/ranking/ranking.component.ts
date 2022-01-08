import { Component, OnInit } from '@angular/core';

import { if_stats_object } from 'src/app/interfaces/if-stats';
import { GlobalService } from 'src/app/services/sf-global.service';
import { StatsService } from 'src/app/services/sf-stats.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  scores: if_stats_object[] | undefined = [];
  size: number = 0;

  constructor(private statsService: StatsService, public global: GlobalService) { }

  ngOnInit(): void {
    this.getRanking();
  }

  async getRanking() {
    this.scores = await this.statsService.getScores();
    if (this.scores !== undefined)
      this.size = this.scores.length;
  }

}
