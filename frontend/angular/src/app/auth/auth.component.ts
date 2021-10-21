import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  constructor(private router: Router) {}

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async ngOnInit() {
    const url = this.router.url;
    const code = this.router.url.split('?')[1]?.substr(5, 64)
    try {
    const res = await axios.get('http://127.0.0.1:3000/auth', {params: {code: code}});
      console.log('it is me;')
      if (res.status === 200)
        document.querySelector('.success-class')?.classList.remove('hidden');
      else
        document.querySelector('.fail-class')?.classList.remove('hidden');
  }
    catch {
      console.log('fail');
        document.querySelector('.fail-class')?.classList.remove('hidden');
    }
    await this.delay(3000);
     this.router.navigate(['/']);
  }
}
