import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'


@Injectable({
  providedIn: 'root',
})

export class FilesService {
  readonly URL = environment.server_url + '/api/files'
  constructor(private http: HttpClient) {}

  getViewFile<T>(body: object): Observable<T> {
    return this.http.post<T>(`${this.URL}/getViewFile`, body)
  }
}