import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  server = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  upload(fd, userId): Observable<HttpEvent<string>> {
    return this.httpClient.post<string>(
      `${this.server}/users/${userId}/photo`,
      fd,
      {
        reportProgress: true,
        observe: 'events',
      }
    );
  }
  uploadd(file, userId): Observable<string> {
    return this.httpClient.post<string>(
      `${this.server}/users/${userId}/photo`,
      file
    );
  }
}
