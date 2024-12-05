import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly URL = environment.server_url + '/api/users';
  constructor(private http: HttpClient) {}

  getTypesDocument<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getTypesDocument`, body);
  }

  saveUser<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/saveUser`, body);
  }

  updateUser<T>(body: FormData): Observable<T> {
    return this.http.put<T>(`${this.URL}/updateUser`, body);
  }

  getUsers<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getUsers`, body);
  }


}
