import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Message {
    login: string = "login";
    id:string = "id";
    body:string = "body";
    to: string = "room";
}
