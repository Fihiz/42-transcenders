import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { OnlineStatusModule } from 'ngx-online-status';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxTypedJsModule } from 'ngx-typed-js';
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
import { AuthComponent } from './auth-page/auth/auth.component';
import { InputPromptComponent } from './auth-page/input-prompt/input-prompt.component';
import { NotFoundComponent } from './registered-page/content/not-found/not-found.component';
import { GameComponent } from './registered-page/content/game/game.component';
import { DoubleAuthComponent } from './auth-page/double-auth/double-auth.component';

import { GlobalService } from './services/sf-global.service';
import { SuperAdminComponent } from './registered-page/content/super-admin/super-admin.component';
import { ModeratorComponent } from './registered-page/content/moderator/moderator.component';

// MERGE
// const config: SocketIoConfig = { url: 'http://127.0.0.1:3000',  options: {autoConnect: false} };
const config: SocketIoConfig = {
  url: `http://${window.location.host}:3000`,
  options: { autoConnect: false },

};

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
    InputPromptComponent,
    NotFoundComponent,
    GameComponent,
    DoubleAuthComponent,
    SuperAdminComponent,
    ModeratorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OnlineStatusModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    
    NgxTypedJsModule,
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
