import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { GlobalService } from 'src/app/services/sf-global.service';
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
    public global: GlobalService
  ) {
    console.log(global.allUserStatus);
  }

  allMyFriends: Array<any> = [];

  allMyRelations: Array<any> = [];

  onSeeAllUsers() {
    this.socket.emit('allUsersInApp');
  }

  async onAddFriend(newFriendLogin: string, friendship: string) {
    // const data = {
    //   currentLogin: this.global.login,
    //   newFriendLogin: newFriendLogin,
    //   friendship: friendship,
    // };
    // // mettre dans une reponse
    // // Avant de faire insert, faire un get sur newFriendLogin pour check si deja existant (violation case)
    // if (!(await this.userService.checkIfAlreadyFriend(data)))
    //   await this.userService.addNewFriend(data);
    // console.log(data.currentLogin, data.newFriendLogin, data.friendship);
    // // si la reponse est bonne
    // // mettre a jour allUserInfo avec l entity updated
    // this.socket.emit('getNewFriendInfo', data.newFriendLogin);
  }

  // getAllMyfriends() {
  //   console.log('COUCOUCOUCOUCOCU', this.allMyFriends);
  // for (let i = 0; i < this.allMyFriends.length; i++) {
  //   console.log('EMIT FOR: ', this.allMyFriends[i].login);
  //   this.socket.emit('getNewFriendInfo', this.allMyFriends[i].login);
  // }
  // }

  setMyFriends() {
    console.log('COUCOUCOUCOUCOCU', this.allMyRelations);
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
