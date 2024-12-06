import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

/* import SecureLS from 'secure-ls'; */


import { MessageSwal } from '../../utils/message';
import { environment } from '../../../environments/environment';

import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
/*   ls: SecureLS = new SecureLS({ encodingType: 'aes' }); */

  userData = signal<any>(null);

  usuario :any;


  private messageSwal = inject(MessageSwal);
  private http = inject(HttpClient);
  private _httpClient = inject(HttpClient);

  public _authenticated = false;

  private _urlServer = `${environment.server_url}/api/auth/`;

  login<T>(body: object): Observable<T> {
    // el tap nos dispara un paso secundario
    return this.http.post<T>(`${this._urlServer}login`, body).pipe(
      tap({
        next: (resp: any) => {
          console.log('resp', resp);
          
          localStorage.setItem("token", JSON.stringify(resp["token"]));

          resp.user["loginDate"] = moment().format("YYYY-MM-DD HH:mm:ss");
          this.usuario = resp.user;
          console.log("this.usuario", this.usuario);

          this.guardarStorage(resp["token"]);
          //abrir pagina en nueva ventana
          return resp.user;
        },
        error: (error: any) => {
          if (error.error.error != null) {
            /* this.notiflixService.showError(`Ha ocurrido un error. ${error.error.error}`, 6000); */
          }
        },
      }),
    );
  }

  validarRenovarToken(): Observable<any> {
    console.log(`${this._urlServer}renovar`);
    
    return this._httpClient.get(`${this._urlServer}renovar`, {}).pipe(
      map((resp: any) => {
        console.log("\x1b[34m%s\x1b[0m", "Respuesta del renovar token: ", resp);
        // this.isTokenExpiring(resp.token);
        localStorage.setItem("token", resp.token);
        this.usuario = resp.user;
        console.log("Respuesta del renovar token: ", resp.user);
        this._authenticated = true;
        return true;
      }),
      catchError((err) => {
        console.log("Error", err);
        return of(false);
      }),
    );
  }

/*   validarRenovarTokenActiveUser(): Observable<any> {
    return this.http.get(`${this.URL}/renovar`, {}).pipe(
      map((resp: any) => {
        this.usuario = resp.user;
        this.guardarStorage(resp.token);
        return true;
      }),
      catchError((err) => {
        this.usuario = null;
        return of(false);
      })
    );
  } */

  set accessToken(token: string) {
    localStorage.setItem("token", token);
  }

  get accessToken(): string {
    return localStorage.getItem("token") ?? "";
  }

  guardarStorage(token: string) {
    localStorage.setItem("token", token);
    //this.ls.set('token', token)
  }
}
