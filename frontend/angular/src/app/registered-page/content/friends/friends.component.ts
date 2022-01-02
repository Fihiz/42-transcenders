import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
// import { if_social } from 'src/app/interfaces/if_social';
import { SocialService } from 'src/app/services/sf-social.service';
import { GlobalService } from 'src/app/services/sf-global.service';
// import axios from "axios";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  myFriends: Array<string> = new Array('1-Alex');

  constructor(
	private socket: Socket,
    private global: GlobalService,
    private socialService: SocialService) { }

	getAllmyFriends() {
		this.myFriends.push('3- Catlyn');
	// this.myFriends.push('Cynthia');
	// this.myFriends.push('Caty');
	// this.myFriends.push('Connor');
	this.socket.emit('getAllMyFriends', this.myFriends)
	}

  ngOnInit(): void {
		this.socket.on('allMyFriends', (data: any) => {
			this.myFriends = data;
		  });
		this.myFriends.push('2- Brian');

		this.getAllmyFriends();
	}


}
