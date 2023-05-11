import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import {
  changeaAtuelBreadcrumb,
  setLoadingSpinner,
} from 'src/app/store/shared/shared.action';
import { environment } from 'src/environments/environment';
import { Mission } from '../../models/mission.interface';
import {
  addMission,
  getSingleMission,
  loadClientsWithoutPagination,
  loadDriversWithoutPagination,
  loadTrucksWithoutPagination,
  updateMission,
} from '../../state/mission.actions';
import {
  getClientsWithoutPagination,
  getDriversWithoutPagination,
  getSiglemissionSelector,
  getTrucksWithoutPagination,
} from '../../state/mission.selector';

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.scss'],
})
export class MissionFormComponent implements OnInit {
  trucks: any;
  drivers: any;
  iStatusClass: string;
  clients: any;
  constructor(private store: Store<AppState>, private ar: ActivatedRoute) {}
  mission$: Observable<Mission> | null;
  imgBaseUrl = environment.imgUrl;

  statusItems = ['Complete', 'Incomplete', 'In progress'];

  mission;

  itemActive: string = 'Add mission';

  mission_id;

  ngOnInit(): void {
    this.mission_id = this.ar.snapshot.params['id'];
    if (this.mission_id) {
      this.getmission();
      this.itemActive = 'Update mission';
    }
    this.loadTrucks();
    this.loadDrivers();
    this.loadClients();
    this.changeBreadcrumb();
  }

  getmission() {
    this.store.dispatch(getSingleMission({ id: this.mission_id }));
    this.mission$ = this.store.select(getSiglemissionSelector);

    this.mission$.subscribe((data: any) => {
      this.mission = data?.data;
      if (this.mission?.status) {
        this.onChange(this.mission.status);
      }
    });
  }

  loadTrucks() {
    this.store.dispatch(loadTrucksWithoutPagination());
    this.store.select(getTrucksWithoutPagination).subscribe((data: any) => {
      this.trucks = data?.data;
    });
  }
  loadDrivers() {
    this.store.dispatch(loadDriversWithoutPagination());
    this.store.select(getDriversWithoutPagination).subscribe((data: any) => {
      this.drivers = data?.data;
    });
  }

  loadClients() {
    this.store.dispatch(loadClientsWithoutPagination());
    this.store.select(getClientsWithoutPagination).subscribe((data: any) => {
      this.clients = data?.data;
      console.log(this.clients);
    });
  }
  changeBreadcrumb() {
    this.store.dispatch(
      changeaAtuelBreadcrumb({
        item: 'Missions',
        itemActive: this.itemActive,
      })
    );
  }

  submit(form: NgForm) {
    const mission = form.value;

    if (mission._id) {
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(updateMission({ mission }));
    } else {
      mission._id = undefined;
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(addMission({ mission }));
    }
  }

  onChange(statutValue) {
    switch (statutValue) {
      case 'Incomplete': {
        this.iStatusClass = 'indicator bg-danger';
        break;
      }
      case 'Complete': {
        this.iStatusClass = 'indicator bg-success';
        break;
      }
      case 'In progress': {
        this.iStatusClass = 'indicator bg-warning';
        break;
      }
      default: {
        this.iStatusClass = null;
        break;
      }
    }
  }
}
