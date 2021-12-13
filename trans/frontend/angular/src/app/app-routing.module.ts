import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth-page/auth/auth.component';
import { AuthGuard } from './guards/gf-auth.guard';
import { AboutMeComponent } from './registered-page/content/about-me/about-me.component';
import { FriendsComponent } from './registered-page/content/friends/friends.component';
import { LiveComponent } from './registered-page/content/live/live.component';
import { NotFoundComponent } from './registered-page/content/not-found/not-found.component';
import { PlayComponent } from './registered-page/content/play/play.component';
import { RankingComponent } from './registered-page/content/ranking/ranking.component';
import { RulesComponent } from './registered-page/content/rules/rules.component';
import { StatsComponent } from './registered-page/content/stats/stats.component';
import { WelcomeComponent } from './registered-page/content/welcome/welcome.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard]},
  { path: 'profile/about-me', component: AboutMeComponent, canActivate: [AuthGuard]},
  { path: 'profile/my-friends', component: FriendsComponent, canActivate: [AuthGuard]},
  { path: 'profile/my-stats', component: StatsComponent, canActivate: [AuthGuard]},
  { path: 'pong/play', component: PlayComponent, canActivate: [AuthGuard]},
  { path: 'pong/live', component: LiveComponent, canActivate: [AuthGuard]},
  { path: 'pong/ranking', component: RankingComponent, canActivate: [AuthGuard]},
  { path: 'pong/rules', component: RulesComponent, canActivate: [AuthGuard]},
  // { path: '**', component: NotFoundComponent, canActivate: [AuthGuard]}, /* Currently breaks the guards logical but would be useful in case of a logged-state wrong taped url */
  { path: '**', redirectTo: '/' } /* Case of a wrong url when user is not connected (console error) */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
