import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/sf-user.service';

@Component({
  selector: 'app-input-prompt',
  templateUrl: './input-prompt.component.html',
  styleUrls: ['./input-prompt.component.css'],
})
export class InputPromptComponent implements OnInit {
  constructor(public userService: UserService) {}

  ngOnInit(): void {}

  i: number = 0;

  increment(): void {
    this.i = (this.i + 1) % this.userService.avatarList.length;
  }

  decrement(): void {
    this.i =
      (this.i + this.userService.avatarList.length - 1) %
      this.userService.avatarList.length;
  }

  profileForm = new FormGroup({
    pseudo: new FormControl('', Validators.required),
    bio: new FormControl('', Validators.required),
    avatarUrl: new FormControl(this.userService.avatarList[0].url),
  });
}
