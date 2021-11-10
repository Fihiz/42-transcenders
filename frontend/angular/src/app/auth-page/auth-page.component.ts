import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {

	@Input() isAuthCheck!: boolean;
	@Output() isAuthChange = new EventEmitter<boolean>();
  	constructor() { }

	onRegister () {
		this.isAuthChange.emit(this.isAuthCheck = true);
	}

}
