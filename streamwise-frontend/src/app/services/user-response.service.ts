import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponseJWT } from '../types/user-response';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserResponseService {

  private apiUrl = 'streamwise-production.up.railway.app/auth';

  constructor(private http: HttpClient) { }

  login(email: string, password: string){
    return this.http.post<UserResponseJWT>(this.apiUrl + "/login", {email,password}).pipe(
      tap((value) =>{
        sessionStorage.setItem("username", value.name);
        sessionStorage.setItem("auth-token", value.token)
      })
    )
  }

  register(name: string, email: string, password:string){
    return this.http.post<UserResponseJWT>(this.apiUrl + "/register", {name, email, password}).pipe(
      tap((value) => {
        sessionStorage.setItem("username", value.name);
      })
    )
  }
}
