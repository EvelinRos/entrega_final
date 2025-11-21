import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.getToken();

  if (!token) {
    auth.logout(); 
    return false;
  }

  if (auth.isTokenExpired()) {
    auth.logout();
    return false;
  }

  return true;
};