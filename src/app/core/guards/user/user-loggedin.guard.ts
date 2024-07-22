import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const employeeLoggedInGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isEmployee = authService.isEmployeeLoggedIn();
  if (isEmployee) {
    router.navigate(['/employee/profile']);
    return false;
  }
  return true;
};
