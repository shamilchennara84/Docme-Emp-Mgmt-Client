import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';


@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    NavbarComponent,
    ContactEditComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    EmployeeRoutingModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
