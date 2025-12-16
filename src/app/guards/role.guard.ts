import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data['roles'];

  const userRole = auth.getUserTipo();

  if (auth.isLoggedIn() && expectedRoles.includes(userRole)) {
    return true;
  }

  router.navigate(['/acceso']);
  return false;
};