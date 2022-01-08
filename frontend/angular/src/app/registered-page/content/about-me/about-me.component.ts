import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
})
export class AboutMeComponent implements OnInit {
  user: string;
  profile: any;
  found: boolean;
  unlockedAchievements: number;
  totalNumberOfAchievements: number;
  achievements: {
      date: Date,
      detail: string,
      icon: string,
  }[];

  constructor(private route: ActivatedRoute) {
    console.log('test1');
    this.user = '';
    this.profile = undefined;
    this.found = true;
    this.achievements = [];
    this.totalNumberOfAchievements = 0;
    this.unlockedAchievements = 0;
  }

  async ngOnInit() {
    console.log('test2');
    this.user = this.route.snapshot.paramMap.get('login') + '';
    const url = `http://${window.location.host}:3000/cb-user/profile/${this.user}`;
    await axios
      .get(url)
      .then((response: any) => {
        this.profile = response.data;
      })
      .catch((error: any) => {
        console.log(error);
      });
    if (this.profile === undefined) this.found = false;
    else this.found = true;

    await axios.get(`http://${window.location.host}:3000/cb-stats/achievements/${this.user}`)
      .then((response: any) => {
        this.achievements = response.data.achievements;
        this.totalNumberOfAchievements = response.data.total_number_of_achievements;
        this.unlockedAchievements = this.achievements.length;
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
}
