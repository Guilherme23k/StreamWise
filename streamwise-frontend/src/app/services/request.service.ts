import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserJwtResponse } from '../types/user-jwt-response';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string){
    return this.http.post<UserJwtResponse>(this.apiUrl + "/login", {email, password}).pipe(
      tap((value) => {
        sessionStorage.setItem("username", value.name);
        sessionStorage.setItem("auth-token", value.token);
      })
    )
  }

  register(name: string, email: string, password: string){
    return this.http.post<UserJwtResponse>(this.apiUrl + "/register", {name, email, password}).pipe(
      tap((value) => {
        sessionStorage.setItem("username", value.name);
      })
    )
  }
}
