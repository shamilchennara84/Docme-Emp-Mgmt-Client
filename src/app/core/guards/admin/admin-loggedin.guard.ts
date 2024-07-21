import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const adminLoggedinGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAdmin = authService.isAdminLoggedIn();
  if (isAdmin) {
    router.navigate(['/admin/employees']);
    return false;
  }
  return true;
};
