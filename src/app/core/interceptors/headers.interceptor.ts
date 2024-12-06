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
  // Pasar la solicitud clonada o original al siguiente paso
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {

      // Redirigir si es un error 401 (No autorizado)
      if (error.status === 401) {
        _router.navigate(['/auth/login']);
      }

      // Propagar el error para que sea manejado más adelante si es necesario
      return throwError(() => error);
    })
  );
};
