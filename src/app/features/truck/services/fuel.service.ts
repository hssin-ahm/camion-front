import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fuel } from '../models/fuel.interface';

@Injectable({
  providedIn: 'root',
})
export class FuelService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  public addFuel(Fuel: Fuel): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/fuel`, Fuel);
  }

  public getSingleFuel(id): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/fuel/${id}`);
  }
  public getFuels(
    truck_id,
    page,
    limit,
    searchfield,
    value
  ): Observable<Fuel[]> {
    if (searchfield) {
      return this.http.get<Fuel[]>(
        `${this.apiServerUrl}/fuel/${truck_id}/trucks?limit=${limit}&page=${page}&searchfieldname=${searchfield}&value=${value}`
      );
    }
    return this.http.get<Fuel[]>(
      `${this.apiServerUrl}/fuel/${truck_id}/trucks?limit=${limit}&page=${page}`
    );
  }

  public updateFuel(Fuel: Fuel): Observable<any> {
    return this.http.put<any>(`${this.apiServerUrl}/fuel/${Fuel._id}`, Fuel);
  }

  public deleteFuel(id): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/fuel/${id}`);
  }
  public checkFuel(truck_id): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/fuel/check/${truck_id}`);
  }
}
