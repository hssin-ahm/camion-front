import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor() {}

  public setRoles(role: string) {
    localStorage.setItem('role', JSON.stringify(role));
  }

  public getRole(): string {
    return JSON.parse(localStorage.getItem('role'));
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken');
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn(): boolean {
    return this.getRole() && this.getToken() ? true : false;
  }
}
