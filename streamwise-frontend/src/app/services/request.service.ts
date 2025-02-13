import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  login() {
    localStorage.setItem('isAuthenticated', 'true');
  }

  logout() {
    localStorage.removeItem('isAuthenticated');
  }

  checkAuth(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
}
