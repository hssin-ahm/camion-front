import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contract } from '../models/contract.interface';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  public addContract(contract: Contract): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/contract`, contract);
  }

  public getTruckContract(truck_id): Observable<any> {
    return this.http.get<any>(
      `${this.apiServerUrl}/contract/${truck_id}/trucks`
    );
  }

  public updateContract(contract: Contract): Observable<any> {
    return this.http.put<any>(
      `${this.apiServerUrl}/contract/${contract._id}`,
      contract
    );
  }
}
