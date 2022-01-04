import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/sf-user.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {

  file: File | null = null;
  formData = new FormData();
  uploaded: boolean = false;

  // constructor() { }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  inputFile(event: any) {
    this.file = event.target.files[0];
  }

  uploadFile() {
    if (this.file !== null) {
      try {
        this.userService.uploadAvatar(this.file).
        then((response: any) => {
          if (this.uploaded === true)
            this.avatarList.pop();
          this.avatarList.push({
            alt: "test",
            url: response + "?" + String(Math.random() * 100000)
          });
          this.uploaded = true;
          console.log(this.avatarList);
        });
      }
      catch(error) {
        console.log("error upload image");
      }

    }
  }




  avatarList: {
    alt: string;
    url: string;
  }[] = [
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

  i: number = 0;

  increment(): void {
    this.i = (this.i + 1) % this.avatarList.length;
  }

  decrement(): void {
    this.i =
      (this.i + this.avatarList.length - 1) %
      this.avatarList.length;
  }



}
