import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fournisseur } from '../models/founisseur.interface';
import { Truck } from '../models/truck.interface';
import { TruckModel } from '../models/truck_model.interface';

@Injectable({
  providedIn: 'root',
})
export class TruckService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getTrucks(page, limit, searchfield, value): Observable<Truck[]> {
    if (searchfield) {
      return this.http.get<Truck[]>(
        `${this.apiServerUrl}/trucks?limit=${limit}&page=${page}&searchfieldname=${searchfield}&value=${value}`
      );
    }
    return this.http.get<Truck[]>(
      `${this.apiServerUrl}/trucks?limit=${limit}&page=${page}`
    );
  }

  public getAllTrucksWithoutPagination(): Observable<Truck[]> {
    return this.http.get<Truck[]>(`${this.apiServerUrl}/trucks/all/nopag`);
  }

  public searchTrucks(key: string): Observable<Truck[]> {
    return this.http.get<Truck[]>(`${this.apiServerUrl}/trucks/search/${key}`);
  }

  public addTruck(truck): Observable<Truck> {
    return this.http.post<Truck>(`${this.apiServerUrl}/trucks`, truck);
  }

  public updateTruck(Truck: Truck, id: number): Observable<Truck> {
    return this.http.put<Truck>(`${this.apiServerUrl}/trucks/${id}`, Truck);
  }

  public deleteTruck(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/trucks/${id}`);
  }

  public getTruck(id: number): Observable<Truck> {
    return this.http.get<Truck>(`${this.apiServerUrl}/trucks/${id}`);
  }

  public getTruckModels(): Observable<TruckModel[]> {
    return this.http.get<TruckModel[]>(`${this.apiServerUrl}/model`);
  }
  public addTruckModel(model: TruckModel): Observable<TruckModel> {
    return this.http.post<TruckModel>(`${this.apiServerUrl}/model`, model);
  }

  public getFournisseurs(): Observable<TruckModel[]> {
    return this.http.get<TruckModel[]>(`${this.apiServerUrl}/fournisseur`);
  }
  public addFounisseur(founisseur: Fournisseur): Observable<Fournisseur> {
    return this.http.post<Fournisseur>(
      `${this.apiServerUrl}/fournisseur`,
      founisseur
    );
  }

  public getAllTrucksInformations(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/truckinfo`);
  }
}
