import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/sf-user.service';

@Component({
  selector: 'app-input-prompt',
  templateUrl: './input-prompt.component.html',
  styleUrls: ['./input-prompt.component.css'],
})
export class InputPromptComponent implements OnInit {
  profileForm = new FormGroup({
    pseudo: new FormControl('', Validators.required),
    bio: new FormControl('', Validators.required),
    avatarUrl: new FormControl(this.userService.avatarList[0].url),
  });

  constructor(public userService: UserService) {}

  ngOnInit(): void {}

  increment(): void {
    this.userService.increment();
  }

  decrement(): void {
    this.userService.decrement();
  }
}
