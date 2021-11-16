import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { RegisteredPageComponent } from './registered-page/registered-page.component';
import { SidebarComponent } from './registered-page/sidebar/sidebar.component';
import { HeaderComponent } from './registered-page/header/header.component';
import { ContentComponent } from './registered-page/content/content.component';
import { ChatComponent } from './registered-page/chat/chat.component';
import { WelcomeComponent } from './registered-page/content/welcome/welcome.component';
import { RulesComponent } from './registered-page/content/rules/rules.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    RegisteredPageComponent,
    SidebarComponent,
    HeaderComponent,
    ContentComponent,
    ChatComponent,
    WelcomeComponent,
    RulesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
