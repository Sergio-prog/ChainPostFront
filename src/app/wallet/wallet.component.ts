import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TransactionType } from '../enums/enums';
import { MatButtonModule } from '@angular/material/button';
import { TonConnectUI } from '@tonconnect/ui';
import TonWeb from 'tonweb';
import { PostsService } from '../services/posts.service';
import { toUserFriendlyAddress } from '@tonconnect/sdk';
import { Router } from '@angular/router';
import { TonService } from '../services/ton.service';

class TCRootElement extends HTMLElement {}

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss',
})
export class WalletComponent implements OnInit {
  constructor(
    private postsService: PostsService,
    private router: Router,
    private tonService: TonService,
  ) {}

  async ngOnInit() {
    this.tonService.initTonConnectUI();
    this.tonService.getToken();
  }

  wallet = {
    balance: 3000,
    transactions: [
      {
        date: new Date('2024-01-17T03:24:00'),
        type: TransactionType.Reward,
        amount: 75,
      },
      {
        date: new Date('2024-11-27T03:24:00'),
        type: TransactionType.Boost,
        amount: 50,
      },
      {
        date: new Date('2024-03-11T03:24:00'),
        type: TransactionType.Referral,
        amount: 100,
      },
      {
        date: new Date('2024-04-04T03:24:00'),
        type: TransactionType.LikeEarnings,
        amount: 30.25,
      },
      {
        date: new Date('2024-05-07T03:24:00'),
        type: TransactionType.FollowBonus,
        amount: 20.0,
      },
    ],
  };

  public balance: number = 0;

  redirectToGame() {
    this.router.navigate(['/game']);
  }

  getIcon(transactionType: TransactionType): { icon: string; color: string } {
    switch (transactionType) {
      case TransactionType.Reward:
        return { icon: 'emoji_events', color: '#2563EB' };
      case TransactionType.Boost:
        return { icon: 'bolt', color: '#CA8A04' };
      case TransactionType.Referral:
        return { icon: 'group_add', color: '#16A34A' };
      case TransactionType.LikeEarnings:
        return { icon: 'thumb_up', color: '#DC2626' };
      case TransactionType.FollowBonus:
        return { icon: 'person_add', color: '#9333EA' };
      default:
        return { icon: 'help_outline', color: '#4B5563' };
    }
  }
}
