import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cost } from '../models/cost.interface';

@Injectable({
  providedIn: 'root',
})
export class CostService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  public getCosts(truck_id, page, limit): Observable<Cost[]> {
    return this.http.get<Cost[]>(
      `${this.apiServerUrl}/cost/${truck_id}/trucks?limit=${limit}&page=${page}`
    );
  }

  public getTotalPrice(truck_id): Observable<number> {
    return this.http.get<number>(`${this.apiServerUrl}/cost/${truck_id}/total`);
  }
}
