import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SweetAlertService } from 'src/app/shared/modules/sweet-alert/sweet-alert.service';
import { AppState } from 'src/app/store/app.state';
import { changeaAtuelBreadcrumb } from 'src/app/store/shared/shared.action';
import { environment } from 'src/environments/environment';
import { deleteMission, loadMissions } from '../../state/mission.actions';
import { getMissions } from '../../state/mission.selector';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss'],
})
export class MissionListComponent implements OnInit {
  missions: Observable<any>;
  imgBaseUrl = environment.imgUrl;
  currentPage = 1;
  size = 5;
  searchPagination = false;

  searchField = [
    // { key: 'truck', value: 'Truck' },
    { key: 'date', value: 'Date' },
    { key: 'start_location', value: 'Start location' },
    { key: 'end_location', value: 'End location' },
    { key: 'description', value: 'Description' },
  ];
  selectedfield: any = null;
  fieldSearchValue: string;
  socket;
  constructor(
    private store: Store<AppState>,
    private sweetAlert: SweetAlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.changeBreadcrumb();
    this.getMissions(this.currentPage, this.size);
  }

  getMissions(page, limit, searchField?, value?) {
    this.store.dispatch(loadMissions({ page, limit, searchField, value }));
    this.missions = this.store.select(getMissions);
  }

  done() {
    this.getMissions(
      this.currentPage,
      this.size,
      this.selectedfield,
      this.fieldSearchValue
    );
  }
  search(value: string) {
    if (value == '') {
      this.getMissions(this.currentPage, this.size);
    } else if (this.selectedfield == null) {
      this.sweetAlert.openAlertMixin(
        'Please select a search field',
        'top-end',
        'info'
      );
    } else {
      this.fieldSearchValue = value;
      this.getMissions(this.currentPage, this.size, this.selectedfield, value);
    }
  }

  selectSize(event) {
    this.size = event.target.value;
    this.getMissions(this.currentPage, this.size);
  }

  onDelete(id) {
    const page = this.currentPage;
    const limit = this.size;
    this.sweetAlert
      .onDelete('Are you sure?', "You won't cancel this mission!", true)
      .then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(deleteMission({ id, page, limit }));
        }
      });
  }

  changeBreadcrumb() {
    this.store.dispatch(
      changeaAtuelBreadcrumb({
        item: 'Missions',
        itemActive: 'List of missions',
      })
    );
  }

  getDivClass(statut: string) {
    switch (statut) {
      case 'Incomplete': {
        return 'bg-soft-danger';
      }
      case 'In progress': {
        return 'bg-soft-warning';
      }
      default: {
        return 'bg-soft-success';
      }
    }
  }

  getIClass(statut: string) {
    switch (statut) {
      case 'Incomplete': {
        return 'bg-danger';
      }
      case 'In progress': {
        return 'bg-warning';
      }
      default: {
        return 'bg-success';
      }
    }
  }
}
