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

  constructor(private route: ActivatedRoute) {
    this.user = '';
    this.profile = undefined;
    this.found = true;
  }

  async ngOnInit() {
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
  }
}
