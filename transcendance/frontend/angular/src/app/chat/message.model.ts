import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Message {
    login: string | undefined = "login";
    id:string | undefined = "id";
    body:string | undefined = "body";
    to: string | undefined = "room";
}
