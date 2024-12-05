import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root',
})
export class PresupuestoService {

  usuario:any;
  readonly URL = environment.server_url + '/api/presupuestos';

  constructor(private http: HttpClient) {}

  getPresupuestos<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getPresupuestos`, body);
  }

  getCategorias<T>(body: object): Observable<T> {
    return this.http.get<T>(`${this.URL}/getCategorias`, body);
  }

  getSubcategorias<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getSubcategorias`, body);
  }

  savePresupuestos<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/savePresupuestos`, body);
  }

  updateStatus<T>(body: object): Observable<T> {
    return this.http.put<T>(`${this.URL}/updateStatus`, body);
  }

  saveDocumentPresupuesto<T>(body: FormData): Observable<T> {
    return this.http.post<T>(`${this.URL}/saveDocumentoPresupuesto`, body);
  }

  getDocumentPresupuesto<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getDocumentPresupuesto`, body);
  }

  updatesaveDocumentPresupuesto<T>(body: FormData): Observable<T> {
    return this.http.put<T>(`${this.URL}/updatesaveDocumentPresupuesto`, body);
  }
}
