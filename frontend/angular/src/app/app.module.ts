import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { AboutMeComponent } from './registered-page/content/about-me/about-me.component';
import { RankingComponent } from './registered-page/content/ranking/ranking.component';
import { StatsComponent } from './registered-page/content/stats/stats.component';
import { LiveComponent } from './registered-page/content/live/live.component';
import { FriendsComponent } from './registered-page/content/friends/friends.component';
import { PlayComponent } from './registered-page/content/play/play.component';

import { OnlineStatusModule } from 'ngx-online-status';
import { GlobalService } from './services/sf-global.service';
import { AuthComponent } from './auth-page/auth/auth.component';

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
    AboutMeComponent,
    RankingComponent,
    StatsComponent,
    LiveComponent,
    FriendsComponent,
    PlayComponent,
    AuthComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, OnlineStatusModule],
  providers: [GlobalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
