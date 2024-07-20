import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

@NgModule({
  declarations: [
    LoginComponent,
    EmployeeListComponent,
    EmployeeFormComponent
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
