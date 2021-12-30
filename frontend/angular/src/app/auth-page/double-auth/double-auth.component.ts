import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/sf-auth.service';
import axios from "axios"

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    const email = 0; /* recuperer le mail */
    const code = await axios.get("http://127.0.0.1:3000/double-auth/", { param: email});
    /* input pour verifier le code */
  }
}
