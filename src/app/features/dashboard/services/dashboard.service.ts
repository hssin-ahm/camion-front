import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TruckStatusData } from '../models/truckStatusData.interface';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getTruckStatus(): Observable<TruckStatusData> {
    return this.http.get<TruckStatusData>(`${this.apiServerUrl}/trucks/status`);
  }
  public getFuelCost(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/fuel/cost`);
  }

  public getInterventionCost(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/intervention/cost`);
  }
  public getTotalCost(option): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/cost/all?option=${option}`);
  }

  public getMissionStatus(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/missions/status`);
  }
}
