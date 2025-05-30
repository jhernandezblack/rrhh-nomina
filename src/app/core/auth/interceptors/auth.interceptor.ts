import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthResponse, User } from '../models/user.model';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Initialize from localStorage if available
  constructor() {
    const user = localStorage.getItem(environment.auth.tokenKey);
    if (user) {
      try {
        this.currentUserSubject.next(JSON.parse(user));
      } catch (e) {
        this.clearAuthData();
      }
    }
  }

  // Method used by the interceptor
  getAccessToken(): string | null {
    return localStorage.getItem(environment.auth.tokenKey);
  }

  // Method used by the interceptor
  refreshToken(): Observable<{ accessToken: string }> {
    const refreshToken = localStorage.getItem(environment.auth.refreshTokenKey);
    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/refresh`, { 
      refreshToken 
    }).pipe(
      tap(response => {
        this.storeAuthData(response);
      }),
      map(response => ({
        accessToken: response.accessToken
      }))
    );
  }

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, credentials).pipe(
      tap(response => this.storeAuthData(response)),
      map(response => response.user)
    );
  }

  logout(): void {
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private storeAuthData(authData: AuthResponse): void {
    localStorage.setItem(environment.auth.tokenKey, authData.accessToken);
    if (authData.refreshToken) {
      localStorage.setItem(environment.auth.refreshTokenKey, authData.refreshToken);
    }
    this.currentUserSubject.next(authData.user);
  }

  private clearAuthData(): void {
    localStorage.removeItem(environment.auth.tokenKey);
    localStorage.removeItem(environment.auth.refreshTokenKey);
    this.currentUserSubject.next(null);
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }
}