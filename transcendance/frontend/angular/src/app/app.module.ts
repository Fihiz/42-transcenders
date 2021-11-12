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
import { GlobalService } from './globales.service';

const config: SocketIoConfig = { url: 'http://127.0.0.1:3000', options: {autoConnect: false} };

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
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
