import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';

/* import SecureLS from 'secure-ls'; */


import { MessageSwal } from '../../utils/message';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
/*   ls: SecureLS = new SecureLS({ encodingType: 'aes' }); */
  usuario :any;
  readonly URL = environment.server_url + '/api/auth';

  private messageSwal = inject(MessageSwal);
  private http = inject(HttpClient);


  login<T>(body: object): Observable<T> {
    // el tap nos dispara un paso secundario
    return this.http.post<T>(`${this.URL}/login`, body).pipe(
      tap({
        next: (resp: any) => {
 /*          this.ls.set('modules', resp['modules']); */
          this.usuario = resp.user;
          this.guardarStorage(resp['token']);
        },
        error: (error: any) => {
          if (error.error.error != null) {
            console.log(error.error);

            this.messageSwal.showWarning(
              'Error! ⚡',
              `Ha ocurrido un error ${error.error.error}`
            );
          }
        },
      })
    );
  }

  validarRenovarToken(): Observable<any> {
    return this.http.get(`${this.URL}/renovar`, {}).pipe(
      map((resp: any) => {
        this.usuario = resp.user;
        this.guardarStorage(resp.token);
        return true;
      }),
      catchError((err) => {
        this.usuario = null;
        return of(true);
      })
    );
  }
  validarRenovarTokenActiveUser(): Observable<any> {
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
  }

  guardarStorage(token: string) {
/*     this.ls.set('token', token); */
  }
}
