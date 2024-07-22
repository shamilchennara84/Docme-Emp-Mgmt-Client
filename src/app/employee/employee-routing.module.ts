import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { employeeLoggedInGuard } from '../core/guards/user/user-loggedin.guard';
import { employeeauthGuard } from '../core/guards/user/userauth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [employeeLoggedInGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [employeeauthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
