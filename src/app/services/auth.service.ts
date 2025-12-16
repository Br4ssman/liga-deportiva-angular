import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/auth';

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((res: any) => {
        if (this.isBrowser()) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('tipo', res.tipo);
          localStorage.setItem('userId', res.userId);
        }
      })
    );
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.clear();
    }
  }

  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('token') : null;
  }

  getUserTipo(): string | null {
    return this.isBrowser() ? localStorage.getItem('tipo') : null;
  }

  isLoggedIn(): boolean {
    return this.isBrowser() && !!localStorage.getItem('token');
  }
}