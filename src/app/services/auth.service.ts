// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { TonConnectUI } from '@tonconnect/ui';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private token: string | null = null;
//   private tonConnectUI: TonConnectUI;

//   constructor(private http: HttpClient) {
//     this.tonConnectUI = new TonConnectUI({
//       manifestUrl: 'https://ton.vote/tonconnect-manifest.json'
//     });
//   }

//   async connectWallet() {
//     try {
//       const wallet = await this.tonConnectUI.connect();
//       const walletAddress = wallet.account.address;

//       const response: any = await this.http.post('/api/auth/wallet/', { wallet_address: walletAddress }).toPromise();
//       this.token = response.access;
//       localStorage.setItem('accessToken', this.token);
//     } catch (error) {
//       console.error('Wallet connection failed', error);
//     }
//   }

//   getToken() {
//     return this.token || localStorage.getItem('accessToken');
//   }
// }
