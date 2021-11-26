import { Component, Output, EventEmitter } from '@angular/core';
const FORTYTWO_APP_ID = '4d5d28ff9d7de95a5193fdc23e41e968fb338bee441891bd99950308ef326a88';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {

	/* OLD */
	// @Input() isAuthCheck!: boolean;
	// @Output() isAuthChange = new EventEmitter<boolean>();
  	// constructor() { }

	// onRegister () {
	// 	this.isAuthChange.emit(this.isAuthCheck = true);
	// }

	@Output() loginForApp = new EventEmitter<string>();

	onRegister () {
		console.log('User clicked on register');
		this.loginForApp.emit("Pgoudz");
	}

}
