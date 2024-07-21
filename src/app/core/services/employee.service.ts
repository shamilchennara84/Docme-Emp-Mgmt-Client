import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  DeleteEmployeeErrorResponse,
  DeleteEmployeeSuccessResponse,
  IEmployee,
  IEmployeeResponse,
  IEmployeesResponse,
} from '../models/employee';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000/api';

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

  updateEmployee(employeeId: string, value: IEmployee) {
    return this.http.put(`${this.apiUrl}/admin/employees/${employeeId}`, value);
  }

  deleteEmployeeById(
    employeeId: string
  ): Observable<DeleteEmployeeSuccessResponse | DeleteEmployeeErrorResponse> {
    return this.http.delete<
      DeleteEmployeeSuccessResponse | DeleteEmployeeErrorResponse
    >(`${this.apiUrl}/admin/employees/${employeeId}`);
  }
}
