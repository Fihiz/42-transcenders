import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-registered-page',
  templateUrl: './registered-page.component.html',
  styleUrls: ['./registered-page.component.css']
})
export class RegisteredPageComponent {

	@Input() isAuthCheck!: boolean;
	@Output() isAuthChange = new EventEmitter<boolean>();

  constructor() { }

	onLogOut () {
		this.isAuthChange.emit(this.isAuthCheck = false);
	}

}
