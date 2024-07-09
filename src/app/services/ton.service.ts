import { Injectable } from '@angular/core';
import { TonConnectUI, toUserFriendlyAddress } from '@tonconnect/ui';
import { PostsService } from './posts.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TonService {
  private tonConnectUI: any;
  private token: string = '';

  constructor(
    private postsService: PostsService,
    private http: HttpClient,
  ) {}

  initTonConnectUI(): void {
    this.tonConnectUI = new TonConnectUI({
      manifestUrl: 'https://ton.vote/tonconnect-manifest.json',
      buttonRootId: 'ton-connect',
    });

    this.tonConnectUI.onStatusChange(async (status: any) => {
      console.log(this.tonConnectUI.modalState);

      const rawAddress = this.tonConnectUI.account.address;
      const userFriendlyAddress = toUserFriendlyAddress(rawAddress);

      // const response: any = await of(this.http.post('/api/auth/wallet/', { wallet_address: rawAddress }));
      // this.token = response.access;
      // localStorage.setItem('accessToken', this.token);

      this.getBalance(userFriendlyAddress);
    });
  }

  private getBalance(address: string): void {
    this.postsService.getBalance(address).subscribe((response) => {
      const balance = response?.result / 10 ** 10;
      console.log(`Balance: ${balance}`);
    });
  }

  getToken() {
    return this.token || localStorage.getItem('accessToken');
  }

  getUserData() {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('/api/user/data/', { headers });
  }
}
