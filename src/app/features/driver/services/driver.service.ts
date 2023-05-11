import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Driver } from '../models/driver.interface';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getDrivers(page, limit, searchfield, value): Observable<Driver[]> {
    if (searchfield) {
      return this.http.get<Driver[]>(
        `${this.apiServerUrl}/users?role=driver&limit=${limit}&page=${page}&searchfieldname=${searchfield}&value=${value}`
      );
    }
    return this.http.get<Driver[]>(
      `${this.apiServerUrl}/users?role=driver&limit=${limit}&page=${page}`
    );
  }

  public getDriversWithoutPagination(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.apiServerUrl}/users/drivers`);
  }

  public addDriver(driver): Observable<Driver> {
    return this.http.post<Driver>(`${this.apiServerUrl}/users`, driver);
  }

  public updateDriver(driver: Driver, id: number): Observable<Driver> {
    return this.http.put<Driver>(`${this.apiServerUrl}/users/${id}`, driver);
  }

  public deleteDriver(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/users/${id}`);
  }

  public getDriver(id: number): Observable<Driver> {
    return this.http.get<Driver>(`${this.apiServerUrl}/users/${id}`);
  }
}
