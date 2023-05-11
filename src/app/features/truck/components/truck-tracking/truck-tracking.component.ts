import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {
  changeaAtuelBreadcrumb,
  setLoadingSpinner,
} from 'src/app/store/shared/shared.action';
import { environment } from 'src/environments/environment';
import { TruckTrackingService } from '../../services/truck-tracking.service';
import { loadTruckInformationWithoutPagination } from '../../state/truck.actions';
import { getTruckInfos } from '../../state/truck.selector';

import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

@Component({
  selector: 'app-truck-tracking',
  templateUrl: './truck-tracking.component.html',
  styleUrls: ['./truck-tracking.component.scss'],
})
export class TruckTrackingComponent implements OnInit {
  map: any;
  truckLat;
  truckLon;

  truckInfos: any;
  selectedTruckInfo: any;
  selectedtruckInfoId;
  imgBaseUrl = environment.imgUrl;

  constructor(
    private store: Store<AppState>,
    private truckTrackingService: TruckTrackingService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.changeBreadcrumb();
    this.truckTrackingService
      .listen('new information added')
      .subscribe((data: any) => {
        if (this.selectedtruckInfoId == data?._id && data?.length != 0) {
          this.selectedTruckInfo = data;
          this.onInitMap(true);
        } else {
          this.getTrucksInformations();
        }
        console.log(data);
      });
    if (!this.truckInfos) {
      this.getTrucksInformations();
    }
  }

  getTrucksInformations() {
    this.store.dispatch(loadTruckInformationWithoutPagination());
    this.store.select(getTruckInfos).subscribe((data: any) => {
      if (data?.length != 0) {
        this.truckInfos = data?.truckInfo;
      }
    });
  }

  onInitMap(newInfoAdded?) {
    if (this.selectedtruckInfoId != null) {
      if (!newInfoAdded) {
        this.selectedTruckInfo = this.truckInfos.filter(
          (data) => data._id == this.selectedtruckInfoId
        )[0];
      }
      this.location.go(`trucks/tracking/${this.selectedtruckInfoId}`);

      this.truckLon = this.selectedTruckInfo.location.coordinates[0];
      this.truckLat = this.selectedTruckInfo.location.coordinates[1];
      console.log(this.selectedTruckInfo);
      console.log(this.truckLon + ' ' + this.truckLat);

      if (this.map) {
        this.map.off();
        this.map.remove();
      }
      setTimeout(() => {
        this.initMap();
      }, 0);
    }
  }

  initMap(): void {
    var iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
    L.Marker.prototype.options.icon = iconDefault;

    //map configuration
    this.map = L.map('map', {
      center: [this.truckLat, this.truckLon],
      attributionControl: false,
      zoom: 7,
    });

    //tiles
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    const marker = L.marker([this.truckLat, this.truckLon]).bindPopup(
      `<strong>${this.selectedTruckInfo?.truck?.model.name}</strong> <br><br> Speed : ${this.selectedTruckInfo?.speed}<br> Mileage : ${this.selectedTruckInfo?.mileage}<br> Fuel : ${this.selectedTruckInfo?.fuel} `
    );

    marker.addTo(this.map);

    tiles.addTo(this.map);
    this.store.dispatch(setLoadingSpinner({ status: false }));
  }
  changeBreadcrumb() {
    this.store.dispatch(
      changeaAtuelBreadcrumb({
        item: 'Trucks',
        itemActive: 'truck tracking',
      })
    );
  }
}
