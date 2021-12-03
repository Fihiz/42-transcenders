import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/sf-user.service';

@Component({
  selector: 'app-input-prompt',
  templateUrl: './input-prompt.component.html',
  styleUrls: ['./input-prompt.component.css'],
})
export class InputPromptComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  i: number = 0;
  // pseudo_test = new FormControl('');
  avatarList: {
    alt: string;
    url: string;
  }[] = [
    {
      alt: 'My Intra Pic',
      url: '../../../assets/myIntraPictureBlack.png',
    },
    {
      alt: 'ageraud',
      url: 'https://cdn.intra.42.fr/users/large_ageraud.jpg',
    },
    {
      alt: 'sad-aude',
      url: 'https://cdn.intra.42.fr/users/large_sad-aude.jpg',
    },
    {
      alt: 'jobenass',
      url: 'https://cdn.intra.42.fr/users/large_jobenass.jpg',
    },
    {
      alt: 'rlepart',
      url: 'https://cdn.intra.42.fr/users/large_rlepart.jpg',
    },
  ];

  increment(): void {
    this.i = (this.i + 1) % this.avatarList.length;
  }

  decrement(): void {
    this.i = (this.i + this.avatarList.length - 1) % this.avatarList.length;
  }

  profileForm = new FormGroup({
    pseudo: new FormControl('', Validators.required),
    bio: new FormControl('', Validators.required),
    avatarUrl: new FormControl('../../../assets/myIntraPictureBlack.png'),
  });
}
