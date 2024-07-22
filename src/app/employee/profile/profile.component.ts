import { Component } from '@angular/core';
import { IEmployee } from '../../core/models/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { getIdFromJwtToken } from '../shared/utils/jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  employeeData!: IEmployee;
  employeeId!: string | null;
  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.fetchEmployeeData();
  }

  fetchEmployeeData() {
    this.employeeService.getEmployeeByCode().subscribe({
      next: (data) => {
        this.employeeData = data;
        console.log(this.employeeData);
      },
      error: (error) => {
        console.error('Error fetching employee data:', error);
      },
    });
  }
}
