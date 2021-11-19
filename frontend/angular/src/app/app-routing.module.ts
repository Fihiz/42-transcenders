import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './registered-page/content/about-me/about-me.component';
import { FriendsComponent } from './registered-page/content/friends/friends.component';
import { LiveComponent } from './registered-page/content/live/live.component';
import { PlayComponent } from './registered-page/content/play/play.component';
import { RankingComponent } from './registered-page/content/ranking/ranking.component';
import { RulesComponent } from './registered-page/content/rules/rules.component';
import { StatsComponent } from './registered-page/content/stats/stats.component';
import { WelcomeComponent } from './registered-page/content/welcome/welcome.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'profile/about-me', component: AboutMeComponent },
  { path: 'profile/my-friends', component: FriendsComponent },
  { path: 'profile/my-stats', component: StatsComponent },
  { path: 'pong/play', component: PlayComponent },
  { path: 'pong/live', component: LiveComponent },
  { path: 'pong/ranking', component: RankingComponent },
  { path: 'pong/rules', component: RulesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
