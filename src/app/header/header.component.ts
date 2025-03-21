import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../data/services/auth.services';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLoggedIn$;
  userEmail$;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.userEmail$ = this.authService.userEmail$;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
}
