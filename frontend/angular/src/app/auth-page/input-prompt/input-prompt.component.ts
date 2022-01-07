import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/sf-user.service';

@Component({
  selector: 'app-input-prompt',
  templateUrl: './input-prompt.component.html',
  styleUrls: ['./input-prompt.component.css'],
})
export class InputPromptComponent implements OnInit {
  
  i: number = 0;
  file: File | null = null;
  uploaded: boolean = false;
  profileForm = new FormGroup({
    pseudo: new FormControl('', Validators.required),
    bio: new FormControl('', Validators.required),
    avatarUrl: new FormControl(this.userService.avatarList[0].url),
  });

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
}
