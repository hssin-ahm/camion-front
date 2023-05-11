import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  server = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  uploadloggedUser(user): Observable<any> {
    return this.httpClient.put<string>(
      `${this.server}/users/updateloggeduser/${user._id}`,
      user
    );
  }
  changePassword(password): Observable<any> {
    return this.httpClient.put<string>(
      `${this.server}/auth/updatepassword`,
      password
    );
  }
}
