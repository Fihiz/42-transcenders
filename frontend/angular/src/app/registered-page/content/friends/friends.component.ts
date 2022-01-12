import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { ChatService } from 'src/app/services/sf-chat.service';
import { GlobalService } from 'src/app/services/sf-global.service';
import { SocialService } from 'src/app/services/sf-social.service';
import { UserService } from 'src/app/services/sf-user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent implements OnInit {
  allUsersInfo: Array<any> = [];
  constructor(
    private socket: Socket,
    private userService: UserService,
    public global: GlobalService,
    private socialService: SocialService,
    private chatService: ChatService
  ) {}

  allMyFriends: Array<any> = [];

  allMyRelations: Array<any> = [];

  onSeeAllUsers() {
    this.socket.emit('allUsersInApp');
  }

  async onAddFriend(newFriendLogin: string, friendship: string) {
    const data = {
      currentLogin: this.global.login,
      newFriendLogin: newFriendLogin,
      friendship: friendship,
    };

    console.log('No relation yet, need to post');
    await this.userService.addNewFriend(data);
    this.setMyFriends();
    console.log(data.currentLogin, data.newFriendLogin, data.friendship);
    this.getAllMyRelations();
  }

  async onRemoveFriend(deleteFriendLogin: string, friendship: string)
  {
	const data = {
		currentLogin: this.global.login,
		newFriendLogin: deleteFriendLogin,
		friendship: friendship,
	  };
	  if (await this.userService.checkIfAlreadyRelation(data))
   		{
			console.log('There is a relation that we can remove');
			await this.userService.removeFriend(data);
      this.getAllMyRelations();
		}
		else{
			console.log('There is NO relation that we can remove');
		}
  }


  async onBlockFriend(blockFriendLogin: string, blocked: boolean)
  {
	  const data = {
		  currentLogin: this.global.login as string,
		  newFriendLogin: blockFriendLogin,
		  friendship: blocked,
	    };
		await this.socialService.blockFriend(data);
    this.getAllMyRelations();
    this.chatService.emission('block', {
      avatar: '',
      conv_id: 0,
      members: [],
      name: '',
      password: '',
      type: ''
    }, 0, {data});
	}

  async onUnBlockFriend(blockFriendLogin: string, blocked: boolean)
  {
	  const data = {
		  currentLogin: this.global.login as string,
		  newFriendLogin: blockFriendLogin,
		  friendship: blocked,
	    };
		await this.socialService.unblockFriend(data);
    this.getAllMyRelations();
    console.log('test test')
    this.chatService.emission('unBlock', {
      avatar: '',
      conv_id: 0,
      members: [],
      name: '',
      password: '',
      type: ''
    }, 0, {data});
	}

  setMyFriends() {
    console.log('COUCOUCOUCOUCOCU', this.allMyRelations);
    this.allMyFriends = [];
    for (let i = 0; i < this.allMyRelations.length; i++) {
      if (this.allMyRelations[i].relation.friendship === 'friend')
      {
        console.log('ils sont amis');
        this.allMyFriends.push(this.allMyRelations[i]);
      }
    }
  }

  async getAllMyRelations() {
    // FOR FRIENDS
    const relations = await this.userService.getAllMyrelations(
      this.userService.user.login
    );
    this.allMyRelations = [];
    this.allMyRelations = relations;
    console.log(relations);
    this.setMyFriends();
  }

  async ngOnInit() {
    await this.getAllMyRelations();
    this.socket.on('allUsersInApp', (data: any) => {
      this.allUsersInfo = [];
      this.allUsersInfo = data;
      console.log('allUsers', this.allUsersInfo);
    });
    this.socket.on('aNewFriend', (data: any) => {
      this.allMyFriends.push(data);
      console.log('allMyFriends', this.allMyFriends);
      // this.allUsersInfo = [];
      // this.allUsersInfo = data;
      // console.log('allUsers', this.allUsersInfo);
      // console.log('allUsers', this.allUsersInfo[0]);
      // this.listAllAvailableRooms = data;
    });
  }
}
