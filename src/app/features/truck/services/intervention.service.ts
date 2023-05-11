import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contract } from '../models/contract.interface';
import { Intervention } from '../models/intervention.interface';

@Injectable({
  providedIn: 'root',
})
export class InterventionService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  public addIntervention(intervention: Intervention): Observable<any> {
    return this.http.post<any>(
      `${this.apiServerUrl}/intervention`,
      intervention
    );
  }

  public getSingleIntervention(id): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/intervention/${id}`);
  }
  public getInterventions(
    truck_id,
    page,
    limit,
    searchfield,
    value
  ): Observable<Intervention[]> {
    if (searchfield) {
      return this.http.get<Intervention[]>(
        `${this.apiServerUrl}/intervention/${truck_id}/trucks?limit=${limit}&page=${page}&searchfieldname=${searchfield}&value=${value}`
      );
    }
    return this.http.get<Intervention[]>(
      `${this.apiServerUrl}/intervention/${truck_id}/trucks?limit=${limit}&page=${page}`
    );
  }

  public updateIntervention(intervention: Intervention): Observable<any> {
    return this.http.put<any>(
      `${this.apiServerUrl}/intervention/${intervention._id}`,
      intervention
    );
  }

  public deleteIntervention(id): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/intervention/${id}`);
  }

  public checkIntervention(truck_id): Observable<any> {
    return this.http.get<any>(
      `${this.apiServerUrl}/intervention/check/${truck_id}`
    );
  }
}
