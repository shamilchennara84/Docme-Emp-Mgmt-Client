import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { IEmployee } from '../../core/models/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  updateEmployee(id: string) {
    console.log('update');
  }
  
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
  constructor(private employeeService: EmployeeService) {}
  
  ngOnInit() {
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
  announceSortChange($event: Sort) {
  console.log("announced");
  }
  
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
