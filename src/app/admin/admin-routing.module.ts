import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
  // { path: 'admin/login', component: AdminLoginComponent },
  // { path: 'admin/employees', component: EmployeeListComponent },
  // { path: 'admin/employee-form', component: EmployeeFormComponent },
  // { path: 'admin/employee-form/:id', component: EmployeeFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
