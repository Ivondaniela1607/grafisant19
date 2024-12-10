import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const _router = inject(Router); // Inyección de Router para redirección
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;

  const authReq = token
  ? req.clone({
      setHeaders: {
        "auth-token": token,
      },
    })
  : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error && error.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('modules');
      }
      return throwError(() => error);
    })
  );
};
