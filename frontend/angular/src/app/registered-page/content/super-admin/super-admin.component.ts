import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { UserService } from 'src/app/services/sf-user.service';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css'],
})
export class SuperAdminComponent implements OnInit {
  allUsersInfo: Array<any> = [];
  constructor(private socket: Socket, private userService: UserService) {}
  onSetUserRoles() {
    console.log('onSetUserRoles');
    this.socket.emit('allUsersInApp');
  }

  onSetNewRole(currentLogin: string, newRole: string) {
    const data = {
      login: currentLogin,
      role: newRole,
    };
    // mettre dans une reponse
    this.userService.adminChangeUserRole(data);
    console.log(`role is changed !`);
    // si la reponse est bonne
    // mettre a jour allUserInfo avec l entity updated
  }

  ngOnInit(): void {
    this.socket.on('allUsersInApp', (data: any) => {
      this.allUsersInfo = [];
      this.allUsersInfo = data;
      console.log('allUsers', this.allUsersInfo);
      console.log('allUsers', this.allUsersInfo[0]);

      // this.listAllAvailableRooms = data;
    });

    // this.socket.on('updatedAppUsers', (data: any) => {
    // this.allUsersInfo = data;
    // console.log('allUsers', this.allUsersInfo);
    // console.log('allUsers', this.allUsersInfo[0]);
    // this.listAllAvailableRooms = data;
    // });
  }
}
