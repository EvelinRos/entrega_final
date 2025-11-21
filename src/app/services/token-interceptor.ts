import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {

  const auth = inject(AuthService);

  const token = sessionStorage.getItem("token");

  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq);
};
