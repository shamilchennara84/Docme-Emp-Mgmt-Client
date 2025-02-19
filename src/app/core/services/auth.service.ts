import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Admin, Employee } from '../models/user';
import { AuthResponse } from '../models/authResponse';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
   private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {}

  adminLogin(credentials: Admin): Observable<AuthResponse | null> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/admin/login`, credentials)
      .pipe(
        map((response) => {
          localStorage.setItem('admintoken', response.token);
          return response;
        })
      );
  }

  employeeLogin(credentials: Employee): Observable<AuthResponse | null> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/employee/login`, credentials)
      .pipe(
        map((response) => {
          console.log(response);
          localStorage.setItem('employeetoken', response.token);
          return response;
        })
      );
  }

  isEmployeeLoggedIn() {
    return this.tokenService.isEmployeeAndValidToken();
  }

  isAdminLoggedIn(): boolean {
    return this.tokenService.isAdminAndValidToken();
  }

  Adminlogout() {
    localStorage.removeItem('admintoken');
    this.router.navigate(['/admin']);
  }

  employeeLogout() {
    localStorage.removeItem('employeetoken');
    this.router.navigate(['/employee']);
  }
}
