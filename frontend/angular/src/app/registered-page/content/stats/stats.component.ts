import { Component, OnInit } from '@angular/core';
import { if_game_object } from 'src/app/interfaces/if-game';
import { if_stats_object } from 'src/app/interfaces/if-stats';
import { GlobalService } from 'src/app/services/sf-global.service';
import { StatsService } from 'src/app/services/sf-stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  matches: if_game_object[] | undefined = [];
  size: number = 0;
  stats?: if_stats_object;
  ratio: number = 0;
  profile: string | undefined = this.global.login;

  constructor(private statsService: StatsService, public global: GlobalService) { }

  ngOnInit(): void {
    this.getMatchHistory();
    this.getStatisticPlayer();
  }

  async getMatchHistory() {
    this.matches = await this.statsService.getHistory();
    if (this.matches)
      this.size = this.matches.length;
  }

  async getStatisticPlayer() {
    this.stats = await this.statsService.getStatistic();
    if (this.stats)
      this.ratio =  Math.floor(100 * this.stats.victory / this.stats.loss) / 100;
  }

}
