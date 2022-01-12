import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { UserService } from 'src/app/services/sf-user.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
})
export class AboutMeComponent implements OnInit, OnDestroy {
  profile: any;
  found: boolean;
  unlockedAchievements: number;
  totalNumberOfAchievements: number;
  achievements: {
      date: Date,
      detail: string,
      icon: string,
  }[];

  profileForm = new FormGroup({
    pseudo: new FormControl('', Validators.required),
    bio: new FormControl('', Validators.required),
    avatarUrl: new FormControl(this.userService.avatarList[0].url),
  });

  constructor(private route: ActivatedRoute, public userService: UserService) {
    this.profile = undefined;
    this.found = true;
    this.achievements = [];
    this.totalNumberOfAchievements = 0;
    this.unlockedAchievements = 0;
  }

  async ngOnInit() {
    const url = `http://${window.location.host}:3000/cb-user/profile/${this.userService.login}`;
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

    await axios.get(`http://${window.location.host}:3000/cb-stats/achievements/${this.userService.login}`)
      .then((response: any) => {
        this.achievements = response.data.achievements;
        this.totalNumberOfAchievements = response.data.total_number_of_achievements;
        this.unlockedAchievements = this.achievements.length;
      })
      .catch((error: any) => {
        console.log(error);
      });

    this.profileForm = new FormGroup({
      pseudo: new FormControl(this.profile.pseudo, Validators.required),
      bio: new FormControl(this.profile.bio, Validators.required),
      avatarUrl: new FormControl(this.userService.avatarList[0].url),
    });
    if (this.userService.uploaded === false && this.userService.user.avatar.search(`${window.location.host}:3000`))
      this.userService.avatarList[0] = {alt: this.userService.user.login, url: this.userService.user.avatar};
    else
      this.userService.avatarList.splice(1, 1);
  }

  async saveChanges() {
    document.getElementById('pseudo already exists')?.classList?.add('d-none');
    document.getElementById('Success')?.classList?.add('d-none');
    document.getElementById('Oops something went wrong updating your profile')?.classList?.add('d-none');
    const pseudo: string = (<HTMLInputElement>(
      document.getElementById('pseudo')
    )).value;
    const bio: string = (<HTMLInputElement>(
      document.getElementById('bio')
    )).value;
    const avatar: string = (<HTMLInputElement>(
      document.getElementById('avatarUrl')
    )).value;
    const response = await axios.get(`http://${window.location.host}:3000/cb-user/pseudo/${pseudo}`, {
      params: { login: this.profile.login }
    });
    if (response.data)
    {
      document.getElementById('pseudo already exists')?.classList?.remove('d-none');
    }
    else
    {
      const responseToUpdate = await axios.post(`http://${window.location.host}:3000/cb-user/profile/${this.profile.login}`, {
        data: {
          pseudo: pseudo,
          bio: bio,
          avatar: avatar,
          // uploaded: this.userService.uploaded
        },
      });
      if (responseToUpdate.data !== "Success")
      {
        document.getElementById('Oops something went wrong updating your profile')?.classList?.remove('d-none');
      }
      else
      {
        document.getElementById('Success')?.classList?.remove('d-none');
      }
    }
  }

  increment() {
    this.userService.increment();
  }

  decrement() {
    this.userService.decrement();
  }

  ngOnDestroy() {
    this.userService.i = 0;
  }
}
