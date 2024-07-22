import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.scss',
})
export class ContactEditComponent implements OnInit {
editContact() {
throw new Error('Method not implemented.');
}
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
    // this.loadEmployeeData();
  }

  initializeEditForm() {
    const phoneNumberValidator = (
      control: any
    ): { [key: string]: any } | null => {
      const validPhoneNumber = /^\d{10}$/.test(control.value); // Adjust regex as needed
      return validPhoneNumber ? null : { invalidPhoneNumber: true };
    };
    this.contactUpdateForm = this.fb.group({
      name: [''],
      age: [''],
      designation: [''],
      phone: ['', [Validators.required, phoneNumberValidator]],
      employeeId: [''],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      location: [''],
    });
  }
}
