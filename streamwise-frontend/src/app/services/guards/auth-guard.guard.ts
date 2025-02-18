import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate{

  constructor(private router:Router) {}

  canActivate():boolean {
    const token = sessionStorage.getItem('auth-token');
  
    if (token){
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp && decodedToken.exp > currentTime){
        return true;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }

}