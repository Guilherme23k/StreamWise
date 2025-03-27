import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataCardService {

  private apiUrlGET = 'http://streamwise-production.up.railway.app/signatures/user/me/signatures';
  private apiUrl = 'http://streamwise-production.up.railway.app/signatures';

  constructor(private http: HttpClient) { }

  getSignatures(): Observable<any>{
    return this.http.get<any>(this.apiUrlGET);
  }

  addSignature(signatureData: any): Observable<any> {
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.http.post<any>(this.apiUrl, signatureData, { headers });
  }

  editSignature(id: number, signatureData: any): Observable<any> {
    return this.http.put(this.apiUrl + `/${id}`, signatureData);
  }

  deleteSignature(id: number): Observable<any>{
    return this.http.delete(this.apiUrl + `/${id}`);
  }


}
