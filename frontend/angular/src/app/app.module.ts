import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component'
import { Symbol42Component } from './symbol42/symbol42.component';

import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'auth', component: AuthComponent},
  { path: 'chat', component: ChatComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Symbol42Component,
    AuthComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
