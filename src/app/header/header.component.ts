import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TonConnectUI } from '@tonconnect/ui';
import { toUserFriendlyAddress } from '@tonconnect/sdk';
import { PostsService } from '../services/posts.service';
import { TonService } from '../services/ton.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  links = [
    { path: '/leaderboard', label: 'Leaderboard', icon: 'emoji_events' },
    { path: '/wallet', label: 'Wallet', icon: 'account_balance_wallet' },
    { path: '/my-posts', label: 'My Posts', icon: 'person_outline' },
  ];

  constructor(private tonService: TonService) {}
}
