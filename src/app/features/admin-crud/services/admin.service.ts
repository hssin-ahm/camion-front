import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from '../models/admin.interface';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAdmins(page, limit, searchfield, value): Observable<Admin[]> {
    if (searchfield) {
      return this.http.get<Admin[]>(
        `${this.apiServerUrl}/users?role=admin&limit=${limit}&page=${page}&searchfieldname=${searchfield}&value=${value}`
      );
    }
    return this.http.get<Admin[]>(
      `${this.apiServerUrl}/users?role=admin&limit=${limit}&page=${page}`
    );
  }

  public getAdminsWithoutPagination(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.apiServerUrl}/users/admins`);
  }

  public addAdmin(admin): Observable<Admin> {
    return this.http.post<Admin>(`${this.apiServerUrl}/users`, admin);
  }

  public updateAdmin(admin: Admin, id: number): Observable<Admin> {
    return this.http.put<Admin>(`${this.apiServerUrl}/users/${id}`, admin);
  }

  public deleteAdmin(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/users/${id}`);
  }

  public getAdmin(id: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.apiServerUrl}/users/${id}`);
  }
}
