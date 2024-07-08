import { Injectable } from '@angular/core';
import { TonConnectUI, toUserFriendlyAddress } from '@tonconnect/ui';
import { PostsService } from './posts.service';

@Injectable({
  providedIn: 'root',
})
export class TonService {
  private tonConnectUI: any; // Adjust type as per your TonConnectUI typings

  constructor(private postsService: PostsService) {}

  // Method to initialize TonConnectUI
  initTonConnectUI(): void {
    this.tonConnectUI = new TonConnectUI({
      manifestUrl: 'https://ton.vote/tonconnect-manifest.json',
      buttonRootId: 'ton-connect',
    });

    this.tonConnectUI.onStatusChange(async (status: any) => {
      console.log(this.tonConnectUI.modalState);

      // Example: Fetch balance when connected
      const rawAddress = this.tonConnectUI.account.address;
      const userFriendlyAddress = toUserFriendlyAddress(rawAddress);

      // Call service method to fetch balance
      this.getBalance(userFriendlyAddress);
    });
  }

  private getBalance(address: string): void {
    // Example: Implement your logic to fetch balance using a service method
    // Replace with actual implementation
    this.postsService.getBalance(address).subscribe((response) => {
      const balance = response?.result / 10 ** 10;
      console.log(`Balance: ${balance}`);
      // Handle balance update or store in a service property for components to use
    });
  }
}
