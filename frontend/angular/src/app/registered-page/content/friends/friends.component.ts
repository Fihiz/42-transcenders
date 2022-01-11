import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/sf-user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  i: number = 0;
  file: File | null = null;
  uploaded: boolean = false;
  profileForm = new FormGroup({
    pseudo: new FormControl('', Validators.required),
    bio: new FormControl('', Validators.required),
    avatarUrl: new FormControl(this.userService.avatarList[0].url),
  });

  avatarList: {
    alt: string;
    url: string;
  }[] = [
    {
      alt: 'My Intra Pic',
      url: '../../assets/profile-pictures/myIntraPictureBlack.png',
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
      alt: 'lpieri',
      url: 'https://cdn.intra.42.fr/users/large_lpieri.jpg',
    },
    {
      alt: 'pgoudet',
      url: 'https://cdn.intra.42.fr/users/large_pgoudet.jpg',
    },
    {
      alt: 'rlepart',
      url: 'https://cdn.intra.42.fr/users/large_rlepart.jpg',
    },
  ];

  login: string | null = null; // may be not required if we have access to login when we select avatar for the first connection


  constructor(public userService: UserService) {}

  ngOnInit(): void {}

  increment(): void {
    this.i = (this.i + 1) % this.userService.avatarList.length;
  }

  decrement(): void {
    this.i =
      (this.i + this.userService.avatarList.length - 1) %
      this.userService.avatarList.length;
  }

  async inputFile(event: any) {
    this.file = event.target.files[0];
    if (this.file !== null) {
      try {
        const avatar: Promise<string> | null = await this.userService.uploadAvatar(this.file);
        if (this.uploaded === true)
          this.userService.avatarList.pop();
        if (avatar) {
          this.userService.avatarList.push( { alt: "uploaded_file", url: avatar + "?" + String(Math.random() * 100000) } );
          this.uploaded = true;
        }
      }
      catch(error) {
        console.error(error);
      }
    }
  }

  async saveAvatar() {
    await this.userService.saveAvatar();
  }

}
