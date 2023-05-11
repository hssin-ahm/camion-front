import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrentUser } from '../model/currentUser.interface';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  PATH_OF_API = environment.apiBaseUrl;

  constructor(private httpclient: HttpClient) {}

  public getMe(): Observable<CurrentUser> {
    return this.httpclient.get<CurrentUser>(this.PATH_OF_API + '/auth/me');
  }
}
