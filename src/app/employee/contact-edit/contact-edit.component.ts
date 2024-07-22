import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IEmployee } from '../../core/models/employee';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.scss',
})
export class ContactEditComponent implements OnInit {
  contactUpdateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toaster: ToastrService,
    private dialog: MatDialogRef<ContactEditComponent>
  ) {}

  ngOnInit(): void {
    this.initializeEditForm();
    this.loadEmployeeData();
  }

  initializeEditForm() {
    this.contactUpdateForm = this.fb.group({
      name: [''],
      age: [''],
      designation: [''],
      phone: ['', [Validators.required]],
      employeeId: [''],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      location: [''],
    });
  }

  loadEmployeeData() {
    console.log(this.data);
    this.contactUpdateForm.patchValue({
      phone: this.data.user.phone,
      email: this.data.user.email,
    });
  }

  editContact() {
    if (this.contactUpdateForm.valid) {
      this.empService
        .updateContact(this.data.user._id, this.contactUpdateForm.value)
        .subscribe({
          next: () => {
            this.toaster.success('Contact updated successfully');
            this.dialog.close();
          },
          error: (error) => {
            this.toaster.error('Failed to update contact', error.message);
          },
        });
    } else {
      this.toaster.warning('Please provide valid data');
    }
  }
}
