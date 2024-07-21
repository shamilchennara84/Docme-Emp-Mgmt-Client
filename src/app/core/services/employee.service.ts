import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployee, IEmployeeResponse } from '../models/employee';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/api';

  getAll(): Observable<IEmployee[]> {
    return this.http
      .get<IEmployeeResponse>(`${this.apiUrl}/admin/employees`)
      .pipe(map((response) => response.data));
  }

  constructor(private http: HttpClient) {}
}
