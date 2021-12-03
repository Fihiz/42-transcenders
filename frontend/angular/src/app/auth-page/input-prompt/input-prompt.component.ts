import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-prompt',
  templateUrl: './input-prompt.component.html',
  styleUrls: ['./input-prompt.component.css'],
})
export class InputPromptComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  profileForm = new FormGroup({
    pseudo: new FormControl('', Validators.required),
    bio: new FormControl('', Validators.required),
  });
}
