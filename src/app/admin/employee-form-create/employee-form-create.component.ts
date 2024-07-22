import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { IEmployee } from '../../core/models/employee';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-employee-form-create',
  templateUrl: './employee-form-create.component.html',
  styleUrl: './employee-form-create.component.scss',
})
export class EmployeeFormCreateComponent implements OnInit {
  employeeCreateForm!: FormGroup;
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

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private toaster: ToastrService,
    private dialog: MatDialogRef<EmployeeFormCreateComponent>
  ) {}

  ngOnInit(): void {
    this.initializeCreateForm();
  }

  initializeCreateForm() {
    this.employeeCreateForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      designation: ['', Validators.required],
      phone: ['', Validators.required],
      employeeId: [
        '',
        [Validators.required, Validators.pattern('[A-Z]{3}\\d{3}')],
      ],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      location: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  togglePasswordVisibility(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  createEmployee() {
    if (this.employeeCreateForm.valid) {
      const newEmployee: IEmployee = this.employeeCreateForm.value;
      this.empService.createEmployee(newEmployee).subscribe(
        () => {
          this.toaster.success('Employee created successfully');
          this.dialog.close();
        },
        (error) => {
          console.log(error);
          this.toaster.error('Failed to create employee', error.error.message);
        }
      );
    } else {
      this.toaster.warning('Please provide valid data');
    }
  }
}
