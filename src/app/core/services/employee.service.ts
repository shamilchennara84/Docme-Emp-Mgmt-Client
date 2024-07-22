import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ICreateEmployeeResponse,
  IDeleteEmployeeResponse,
  IEmployee,
  IEmployeeResponse,
  IEmployeesResponse,
} from '../models/employee';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl;

  getAll(): Observable<IEmployee[]> {
    return this.http
      .get<IEmployeesResponse>(`${this.apiUrl}/admin/employees`)
      .pipe(map((response) => response.data));
  }

  getByCode(usercode: string): Observable<IEmployee> {
    return this.http
      .get<IEmployeeResponse>(`${this.apiUrl}/admin/employees/${usercode}`)
      .pipe(map((response) => response.data));
  }
  getEmployeeByCode(): Observable<IEmployee> {
    return this.http
      .get<IEmployeeResponse>(`${this.apiUrl}/employee/profile`)
      .pipe(map((response) => response.data));
  }

  createEmployee(newEmployee: IEmployee): Observable<ICreateEmployeeResponse> {
    return this.http.post<ICreateEmployeeResponse>(
      `${this.apiUrl}/admin/employees`,
      newEmployee
    );
  }
  updateEmployee(employeeId: string, value: IEmployee) {
    return this.http.put(`${this.apiUrl}/admin/employees/${employeeId}`, value);
  }

  deleteEmployeeById(employeeId: string): Observable<IDeleteEmployeeResponse> {
    return this.http.delete<IDeleteEmployeeResponse>(
      `${this.apiUrl}/admin/employees/${employeeId}`
    );
  }
}
