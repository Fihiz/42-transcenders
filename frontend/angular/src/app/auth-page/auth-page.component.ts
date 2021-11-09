import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
})
export class AuthPageComponent {
  @Input() isAuthChild!: boolean;
  @Output() isAuthChange = new EventEmitter<boolean>();

  onRegister() {
    this.isAuthChange.emit((this.isAuthChild = true));
    console.log('You clicked on Register');
  }
}
