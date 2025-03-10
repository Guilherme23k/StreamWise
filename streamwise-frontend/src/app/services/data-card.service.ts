import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataCardService {

  private apiUrl = 'http://localhost:8080/signatures/user/me/signatures';
  private apiUrlPOST = 'http://localhost:8080/signatures';

  constructor(private http: HttpClient) { }

  getSignatures(): Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }

  addSignature(signatureData: any): Observable<any> {
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.http.post<any>(this.apiUrlPOST, signatureData, { headers });
  }
}
