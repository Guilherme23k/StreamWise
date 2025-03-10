import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataCardService {

  private apiUrl = 'http://localhost:8080/signatures/user/me/signatures'

  constructor(private http: HttpClient) { }

  getSignatures(): Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }
}
