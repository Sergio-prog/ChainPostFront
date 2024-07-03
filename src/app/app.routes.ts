import { Routes } from '@angular/router';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { WalletComponent } from './wallet/wallet.component';
import { MyPostsComponent } from './my-posts/my-posts.component';

export const routes: Routes = [
  { path: '', redirectTo: '/leaderboard', pathMatch: 'full' },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'wallet', component: WalletComponent },
  { path: 'my-posts', component: MyPostsComponent },
];
