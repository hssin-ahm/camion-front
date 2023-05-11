import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Location } from '@angular/common';

import {
  changeaAtuelBreadcrumb,
  setLoadingSpinner,
} from 'src/app/store/shared/shared.action';
import { loadMissionsWithoutPagination } from '../../state/mission.actions';
import { getMissionsWithoutPagination } from '../../state/mission.selector';

import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { ActivatedRoute } from '@angular/router';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

@Component({
  selector: 'app-mission-tracking',
  templateUrl: './mission-tracking.component.html',
  styleUrls: ['./mission-tracking.component.scss'],
})
export class MissionTrackingComponent implements OnInit {
  map: any;
  startLat;
  startLon;
  endLat;
  endLon;

  missions;
  selectedMission: any = null;
  startAdresseSelected: any;
  endAdresseSelected: any;
  constructor(
    private store: Store<AppState>,
    private ar: ActivatedRoute,
    private location: Location
  ) {}

  selectedMissionId: any = null;

  ngOnInit(): void {
    this.selectedMissionId = this.ar.snapshot.queryParams['id'];

    this.changeBreadcrumb();
    this.getMissions();
    setTimeout(() => {
      this.onInitMap();
    }, 0);
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
      center: [this.startLat, this.startLon],
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

    L.Routing.control({
      router: L.Routing.osrmv1({
        serviceUrl: `https://router.project-osrm.org/route/v1/`,
      }),
      showAlternatives: false,
      fitSelectedRoutes: false,
      show: true,
      routeWhileDragging: false,
      waypoints: [
        L.latLng(this.startLat, this.startLon),
        L.latLng(this.endLat, this.endLon),
      ],
    }).addTo(this.map);
    tiles.addTo(this.map);
    this.store.dispatch(setLoadingSpinner({ status: false }));
  }
  resetmap() {
    this.map = null;
  }
  onInitMap() {
    if (this.selectedMissionId != null) {
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.selectedMission = this.missions.filter(
        (data) => data._id == this.selectedMissionId
      );
      this.selectedMission = this.selectedMission[0];
      this.startAdresseSelected = this.selectedMission.start_location;
      this.endAdresseSelected = this.selectedMission.end_location;
      this.startLon = this.selectedMission.location_start.coordinates[0];
      this.startLat = this.selectedMission.location_start.coordinates[1];

      this.endLon = this.selectedMission.location_end.coordinates[0];
      this.endLat = this.selectedMission.location_end.coordinates[1];
      if (this.map) {
        this.map.off();
        this.map.remove();
      }
      setTimeout(() => {
        this.initMap();
      }, 0);
    }
  }
  getMissions() {
    this.store.dispatch(loadMissionsWithoutPagination());
    this.store.select(getMissionsWithoutPagination).subscribe((data: any) => {
      if (data?.length != 0) {
        this.missions = data?.missions;
      }
    });
  }

  changeBreadcrumb() {
    this.store.dispatch(
      changeaAtuelBreadcrumb({
        item: 'Missions',
        itemActive: 'mission tracking',
      })
    );
  }

  getSpanClass(statut: string) {
    switch (statut) {
      case 'Incomplete': {
        return 'badge bg-danger';
      }
      case 'In progress': {
        return 'badge bg-warning';
      }
      default: {
        return 'badge bg-primary';
      }
    }
  }
}
