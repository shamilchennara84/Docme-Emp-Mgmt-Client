import { Component } from '@angular/core';
import { IEmployee } from '../../core/models/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ContactEditComponent } from '../contact-edit/contact-edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  employeeData!: IEmployee;
  employeeId!: string | null;
  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

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

  updateEmployee() {
     const popup = this.dialog.open(ContactEditComponent, {
       enterAnimationDuration: '1000ms',
       exitAnimationDuration: '500ms',
       width: '50%',
       data: {
         user: this.employeeData,
       },
     });
     popup.afterClosed().subscribe((res) => {
       this.fetchEmployeeData();
     });
  }

}
