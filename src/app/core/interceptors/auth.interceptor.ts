import { HttpRequest, HttpHandler, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

// Cambia la firma para ajustarse al tipo HttpInterceptorFn
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _router = inject(Router);

  // Verificar si hay un token
  if (localStorage.getItem("token")) {
    // Clonar la solicitud con el token
    const newReq = req.clone({
      setHeaders: {
        "auth-token": localStorage.getItem("token") || '',
      },
    });

    return next(newReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          console.log("\x1b[31m%s\x1b[0m", "authInterceptor: 401 Unauthorized");
          _router.navigate(["/auth/login"]);
        }
        return throwError(error);
      }),
    );
  }

  // Si no hay token, devolver la solicitud original sin modificaciones
  return next(req);
};
