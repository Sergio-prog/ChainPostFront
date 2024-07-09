import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { filter } from 'rxjs';
declare global {
  interface Window {
    Telegram: any; // Define the Telegram type based on your application's needs
  }
}
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
})
export class AppComponent {
  constructor(private router: Router) {}
  public initData: any;
  ngOnInit() {
    // Subscribe to router events to detect route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Check current route and update boolean flag
        this.checkGamePage();
      });

    if (window.Telegram && window.Telegram.WebApp) {
      console.log('Telegram WebApp is available:', window.Telegram.WebApp);

      this.initData = window.Telegram.WebApp.initData;

      if (this.initData) {
        try {
          let converted = decodeURIComponent(this.initData);
          let parsedObject = JSON.parse(converted);
          console.log('Parsed Object:', parsedObject);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      } else {
        this.initData = 'initData is empty or not available';
        console.warn('initData is empty or not available');
      }
    } else {
      console.log('Telegram WebApp is not available');
    }
  }

  // Method to check if the current route is the game page
  isGamePage(): boolean {
    return this.router.url.includes('/game');
  }

  // Optional: You can also use this flag if you want to show/hide other elements based on the route
  private checkGamePage(): void {
    const isGame = this.isGamePage();
    // Perform additional actions based on whether it's a game page or not
  }
}
