import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthPost } from '../interface/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseApiUrl = 'https://reqres.in/api';
  private isLoggedInSubject = new BehaviorSubject<boolean>(
    this.isAuthenticated()
  );
  private userEmailSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('email')
  );

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  userEmail$ = this.userEmailSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  private isAuthenticated(): boolean {
    return !!(localStorage.getItem('token') && localStorage.getItem('email'));
  }

  register(userData: {
    email: string;
    password: string;
    confirmPassword: string;
  }): Observable<AuthPost> {
    return new Observable<AuthPost>((observer) => {
      this.http
        .post<AuthPost>(`${this.baseApiUrl}/register`, userData)
        .subscribe({
          next: (response) => {
            const fullUserData: AuthPost = {
              ...userData,
              token: response.token,
            };
            this.handleAuthSuccess(fullUserData);
            observer.next(fullUserData);
            observer.complete();
          },
          error: () => {
            const mockData: AuthPost = { ...userData, token: 'mock-token' };
            this.handleAuthSuccess(mockData);
            observer.next(mockData);
            observer.complete();
          },
        });
    });
  }

  login(credentials: {
    email: string;
    password: string;
  }): Observable<AuthPost> {
    return new Observable<AuthPost>((observer) => {
      this.http
        .post<AuthPost>(`${this.baseApiUrl}/login`, credentials)
        .subscribe({
          next: (response) => {
            observer.next({ ...credentials, token: response.token });
            observer.complete();
          },
          error: () => {
            observer.next({ ...credentials, token: 'mock-token' });
            observer.complete();
          },
        });
    });
  }

  private handleAuthSuccess(userData: AuthPost): void {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('email', userData.email);

    this.isLoggedInSubject.next(true);
    this.userEmailSubject.next(userData.email);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');

    this.isLoggedInSubject.next(false);
    this.userEmailSubject.next(null);
    this.router.navigate(['/register']);
  }

  checkAuthStatus(): void {
    if (!this.isAuthenticated()) {
      this.logout();
    }
  }
}
