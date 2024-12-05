import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root',
})
export class ServiciosService {


  readonly URL = environment.server_url + '/api/servicios';

  constructor(private http: HttpClient) {}

  getServicios<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getServicios`, body);
  }

  getServiciosById<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getServiciosById`, body);
  }

  getServiciosImg<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getServiciosImg`, body);
  }

  getUltimosProyectos<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getUltimosProyectos`, body);
  }

  getClientes<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getClientes`, body);
  }
}
