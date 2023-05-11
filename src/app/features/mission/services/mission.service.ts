import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Truck } from '../../truck/models/truck.interface';
import { Mission } from '../models/mission.interface';
import { MissionHistoryReq } from '../models/missionHistoryReq.interface';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getMissions(page, limit, searchfield, value): Observable<Mission[]> {
    if (searchfield) {
      return this.http.get<Mission[]>(
        `${this.apiServerUrl}/missions?limit=${limit}&page=${page}&searchfieldname=${searchfield}&value=${value}`
      );
    }
    return this.http.get<Mission[]>(
      `${this.apiServerUrl}/missions?limit=${limit}&page=${page}`
    );
  }

  public addMission(Mission): Observable<Mission> {
    return this.http.post<Mission>(`${this.apiServerUrl}/missions`, Mission);
  }

  public updateMission(Mission: Mission, id: number): Observable<Mission> {
    return this.http.put<Mission>(
      `${this.apiServerUrl}/missions/${id}`,
      Mission
    );
  }

  public deleteMission(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/missions/${id}`);
  }

  public getMission(id: number): Observable<Mission> {
    return this.http.get<Mission>(`${this.apiServerUrl}/missions/${id}`);
  }

  public getDriverMission(driver_id: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiServerUrl}/missions/${driver_id}/driver`
    );
  }
  public getClientMission(
    client_id,
    page,
    limit,
    searchfield,
    value
  ): Observable<Mission[]> {
    if (searchfield) {
      return this.http.get<Mission[]>(
        `${this.apiServerUrl}/missions?client=${client_id}&limit=${limit}&page=${page}&searchfieldname=${searchfield}&value=${value}`
      );
    }
    return this.http.get<Mission[]>(
      `${this.apiServerUrl}/missions?client=${client_id}&limit=${limit}&page=${page}`
    );
  }

  public getMissionHistory(
    missionHistoryReq: MissionHistoryReq
  ): Observable<Mission> {
    return this.http.post<Mission>(
      `${this.apiServerUrl}/missions/history`,
      missionHistoryReq
    );
  }

  public getAllMissions(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/missions/all`);
  }
}
