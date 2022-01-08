import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css'],
})
export class SuperAdminComponent implements OnInit {
  // allUsers;
  constructor(private socket: Socket) {}

  ngOnInit(): void {
    // this.socket.on('allUsers', (data: any) => {
    // console.log('allAvailableRoomsInApp', data);
    // this.listAllAvailableRooms = data;
    // });
  }
}
