import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { EmployeeFormCreateComponent } from './employee-form-create/employee-form-create.component';
import { EmployeeFormEditComponent } from './employee-form-edit/employee-form-edit.component';

@NgModule({
  declarations: [
    LoginComponent,
    EmployeeListComponent,
    NavbarComponent,
    EmployeeFormCreateComponent,
    EmployeeFormEditComponent
  ],
  imports: [CommonModule, AdminRoutingModule,MaterialModule,ReactiveFormsModule,FormsModule],
})
export class AdminModule {}
