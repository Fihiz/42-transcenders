import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Message {
    id:any = "id";
    conv_id: number = 0;
    login: string = "login";
    date: Date = new Date();
    body:string = "body";
    to: Array<string> = [];

}
