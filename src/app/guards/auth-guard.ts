import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth';
import { isPlatformBrowser } from '@angular/common';

export const authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const isLogged = auth.isLoggedIn();

  if (!isLogged) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};

