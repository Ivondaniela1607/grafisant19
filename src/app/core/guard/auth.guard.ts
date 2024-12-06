import { Injectable, inject } from "@angular/core";

import { Router } from "@angular/router";
import { tap } from "rxjs";
import { AuthService } from "../services/auth.service";
/* import { NotiflixService } from "@services/notiflix.service"; */

@Injectable()
export class AuthGuard {
/*   private _notiflixService = inject(NotiflixService); */

  constructor(
    private router: Router,
    private authSvc: AuthService,
  ) {}

  canActivate() {
    return this.authSvc.validarRenovarToken().pipe(
      tap((estAutenticado) => {
        console.log('estAutenticado', estAutenticado);
        
        if (!estAutenticado) {
          localStorage.removeItem("token");
          localStorage.removeItem("operators");
          localStorage.removeItem("tok");
          localStorage.removeItem("modules");
          localStorage.removeItem("token");

/*           this._notiflixService.showError("Debe de estar logueado para acceder"); */

          this.router.navigateByUrl("/auth/login");
        }
      }),
    );
  }
}
