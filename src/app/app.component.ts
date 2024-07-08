import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
})
export class AppComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    // Subscribe to router events to detect route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Check current route and update boolean flag
        this.checkGamePage();
      });
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
