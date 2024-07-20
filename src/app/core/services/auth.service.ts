import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  login(credentials: {
    employeeId: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/employee/login`, credentials);
  }
}
