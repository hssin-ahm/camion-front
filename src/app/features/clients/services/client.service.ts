import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  public addClient(client: any): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/clients`, client);
  }

  public getSingleClient(id): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/Clients/${id}`);
  }
  public getClients(page, limit, searchfield?, value?): Observable<any[]> {
    if (searchfield) {
      return this.http.get<any[]>(
        `${this.apiServerUrl}/clients/?limit=${limit}&page=${page}&searchfieldname=${searchfield}&value=${value}`
      );
    }
    return this.http.get<any[]>(
      `${this.apiServerUrl}/clients?limit=${limit}&page=${page}`
    );
  }

  public updateClient(client: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiServerUrl}/clients/${client._id}`,
      client
    );
  }

  public deleteClient(id): Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/clients/${id}`);
  }

  public getAllClient(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/clients/all`);
  }
}
