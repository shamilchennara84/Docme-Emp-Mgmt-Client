import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { IEmployee } from '../../core/models/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormEditComponent } from '../employee-form-edit/employee-form-edit.component';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeFormCreateComponent } from '../employee-form-create/employee-form-create.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'name',
    'age',
    'designation',
    'phone',
    'employeeId',
    'email',
    'address',
    'location',
    'action',
  ];

  employeeList: IEmployee[] = [];
  dataSource = new MatTableDataSource<IEmployee>(this.employeeList);
  subscriptions: Subscription[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    const employeeSubscription = this.employeeService
      .getAll()
      .subscribe((employees) => {
        this.employeeList = employees;
        console.log(this.employeeList);
        this.dataSource = new MatTableDataSource(this.employeeList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    this.subscriptions.push(employeeSubscription);
  }

  createEmployee() {
    const popup = this.dialog.open(EmployeeFormCreateComponent, {
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      width: '50%',
    });
    popup.afterClosed().subscribe(() => {
      this.fetchEmployees();
    });
  }

  updateEmployee(id: string) {
    const popup = this.dialog.open(EmployeeFormEditComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: {
        usercode: id,
      },
    });
    popup.afterClosed().subscribe((res) => {
      this.fetchEmployees();
    });
  }

  deleteEmployee(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployeeById(id).subscribe(
          () => {
            this.toastr.success('Employee deleted successfully!', 'Success');
            this.fetchEmployees();
          },
          (error: HttpErrorResponse) => {
            this.toastr.error('Failed to delete employee.', 'Error');
          }
        );
      }
    });
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
