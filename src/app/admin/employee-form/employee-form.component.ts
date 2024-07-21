import { Component, Inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../../core/services/employee.service';
import { IEmployee } from '../../core/models/employee';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent implements OnInit {
  employeeUpdateForm!: FormGroup;
  hide = signal(true);
  locations = [
    'San Francisco',
    'New York',
    'Los Angeles',
    'Chicago',
    'Seattle',
    'Austin',
    'Denver',
    'Miami',
    'Boston',
    'Dallas',
  ];

  designations = [
    'Software Engineer',
    'Project Manager',
    'Quality Assurance Engineer',
    'UI/UX Designer',
    'Data Scientist',
    'DevOps Engineer',
    'Human Resources Manager',
    'Marketing Manager',
    'Sales Representative',
    'Customer Support Specialist',
  ];
  editData!: IEmployee;
  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toaster: ToastrService,
    private dialog: MatDialogRef<EmployeeFormComponent>
  ) {}

  ngOnInit(): void {
    this.initializeEditForm();
    this.loadEmployeeData();
  }

  initializeEditForm() {
    this.employeeUpdateForm = this.fb.group({
      name: [''],
      age: [''],
      designation: ['', Validators.required],
      phone: [''],
      employeeId: ['', Validators.required],
      email: [''],
      address: [''],
      location: ['', Validators.required],
    });
  }

  loadEmployeeData() {
    if (this.data.usercode != null && this.data.usercode != '') {
      this.empService.getByCode(this.data.usercode).subscribe((res) => {
        this.editData = res;
        console.log(res, 'editdata');
        this.employeeUpdateForm.setValue({
          name: res.name,
          age: res.age,
          designation: res.designationTitle,
          phone: res.phone,
          employeeId: res.employeeId,
          email: res.email,
          address: res.address,
          location: res.city,
        });
      });
    }
  }

  editEmployee() {
    if (this.employeeUpdateForm.valid) {
      this.empService
        .updateEmployee(
          this.editData._id,
          this.employeeUpdateForm.value
        )
        .subscribe(() => {
          this.toaster.success('Updated succesfully');
          this.dialog.close();
        });
    } else {
      this.toaster.warning('please provide valid data');
    }
  }
}
