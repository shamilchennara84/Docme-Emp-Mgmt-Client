import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';

import { Admin } from '../models/admin';
import { AuthResponse } from '../models/authResponse';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private tokenService: TokenService,private router:Router) {}

  adminLogin(credentials: Admin): Observable<AuthResponse | null> {
    console.log('hello');
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/admin/login`, credentials)
      .pipe(
        map((response) => {
          localStorage.setItem('admintoken', response.token);
          return response;
        })
      );
  }

  isAdminLoggedIn(): boolean {
    return this.tokenService.isAdminAndValidToken();
  }

  Adminlogout() {
    localStorage.removeItem('admintoken');
    this.router.navigate(['/admin']);
  }
}
