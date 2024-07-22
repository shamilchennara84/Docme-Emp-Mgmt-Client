import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';

export const employeeauthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isEmployee = authService.isEmployeeLoggedIn();
  if (!isEmployee) {
    router.navigate(['/employee']); 
    return false;
  }
  return true;
};
