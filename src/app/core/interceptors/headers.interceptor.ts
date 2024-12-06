import { inject, Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  private _router = inject(Router);

  get authToken() {
    return localStorage.getItem("token") || "";
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const cloneReq = request.clone({
      setHeaders: {
        "auth-token": this.authToken,
      },
    });
    return next.handle(cloneReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this._router.navigate(["/auth/login"]);
        }
        return throwError(error);
      }),
    );
  }
}
