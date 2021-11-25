import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private router: Router) { }
  // private socket: Socket,
  // private authService: AuthService) {}

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async ngOnInit() {
    const code = this.router.url.split('?')[1]?.substr(5, 64)
    try {
    const res = await axios.get('http://127.0.0.1:3000/auth', {params: {code: code}});
    const Res = res.data as unknown as any
      if (Res.status === 'OK')
      {
        // this.socket.on('connect', () => this.authService.introduce(this.socket, Res))
        // this.socket.connect();
        // document.querySelector('.success-class')?.classList.remove('hidden');
        console.log('the Result is ok');
      }
      else if (Res.status === 'AC')
      {
        // this.socket.on('connect', () => this.authService.introduce(this.socket, Res));
        // this.socket.connect();
        // document.querySelector('.success-class')?.classList.remove('hidden');
        console.log("already in the database");
      }
      else
        console.log('result else');
        // document.querySelector('.fail-class')?.classList.remove('hidden');
    }
    catch (error){
      console.log('ngInit Auth error = ', error);
      // document.querySelector('.fail-class')?.classList.remove('hidden');
    }
    await this.delay(2000);
    this.router.navigate(['/registered-page']);
  }

}
