import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { DecodedJWT } from '../models/decodedJWT';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  isAdminAndValidToken(): boolean {
    const token = localStorage.getItem('admintoken');
    if (!token) {
      return false;
    }

    try {
      const decodedToken: DecodedJWT = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        this.removeAdminToken();
        return false;
      }

      if (decodedToken.role === 'admin') {
        return true;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }

    this.removeAdminToken();
    return false;
  }

  // ===================================

  isEmployeeAndValidToken(): boolean {
    const token = localStorage.getItem('employeetoken');
    if (!token) {
      return false;
    }

    try {
      const decodedToken: DecodedJWT = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        this.removeEmployeeToken();
        return false;
      }

      if (decodedToken.role !== 'admin') {
        return true;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }

    this.removeEmployeeToken();
    return false;
  }

  removeAdminToken() {
    localStorage.removeItem('admintoken');
  }

  removeEmployeeToken() {
    localStorage.removeItem('employeetoken');
  }
}
