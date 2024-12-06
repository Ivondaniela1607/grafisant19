import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";

export const ErrorResponseInterceptor: HttpInterceptorFn = (req:any, next:any) => 
  next(req).pipe(catchError( handleErrorRepsonse));
    function handleErrorRepsonse(error: HttpErrorResponse) {
      return throwError(() => 'error');
    }
    