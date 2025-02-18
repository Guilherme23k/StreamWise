import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AlreadyAuthGuard implements CanActivate {

constructor(private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('auth-token');

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp && decodedToken.exp > currentTime) {
          this.router.navigate(['/dashboard']);
          return false;
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }
    return true;
  }
  
}
