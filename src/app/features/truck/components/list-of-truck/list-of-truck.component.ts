import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SweetAlertService } from 'src/app/shared/modules/sweet-alert/sweet-alert.service';

import { AppState } from 'src/app/store/app.state';
import { changeaAtuelBreadcrumb } from 'src/app/store/shared/shared.action';
import { environment } from 'src/environments/environment';
import {
  deleteTruck,
  loadTrucks,
  searchTrucks,
} from '../../state/truck.actions';
import { getTrucks } from '../../state/truck.selector';
@Component({
  selector: 'app-list-of-truck',
  templateUrl: './list-of-truck.component.html',
  styleUrls: ['./list-of-truck.component.scss'],
})
export class ListOfTruckComponent implements OnInit {
  trucks: Observable<any>;
  imgBaseUrl = environment.imgUrl;
  currentPage = 1;
  size = 5;
  searchPagination = false;


  searchField = [
    { key: 'registration_number', value: 'Registration Number' },
    { key: 'transmission', value: 'Transmission' },
    { key: 'statut', value: 'Status' },
  ];
  selectedfield: any = null;
  fieldSearchValue: string;

  constructor(
    private store: Store<AppState>,
    private sweetAlert: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.changeBreadcrumb();
    this.getTrucks(this.currentPage, this.size);
  }

  getTrucks(page, limit, searchField?, value?) {
    this.store.dispatch(loadTrucks({ page, limit, searchField, value }));
    this.trucks = this.store.select(getTrucks);
  }

  done() {
    this.getTrucks(
      this.currentPage,
      this.size,
      this.selectedfield,
      this.fieldSearchValue
    );
  }
  search(value: string) {
    if (value == '') {
      this.getTrucks(this.currentPage, this.size);
    } else if (this.selectedfield == null) {
      this.sweetAlert.openAlertMixin(
        'Please select a search field',
        'top-end',
        'info'
      );
    } else {
      this.fieldSearchValue = value;
      this.getTrucks(this.currentPage, this.size, this.selectedfield, value);
    }
  }

  selectSize(event) {
    this.size = event.target.value;
    this.getTrucks(this.currentPage, this.size);
  }

  onDelete(id) {
    const page = this.currentPage;
    const limit = this.size;
    this.sweetAlert
      .onDelete('Are you sure?', "You won't be able to revert this!")
      .then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(deleteTruck({ id, page, limit }));
        }
      });
  }

  changeBreadcrumb() {
    this.store.dispatch(
      changeaAtuelBreadcrumb({ item: 'Trucks', itemActive: 'List of trucks' })
    );
  }

  getDivClass(statut: string) {
    switch (statut) {
      case 'inactive': {
        return 'bg-soft-danger';
      }
      case 'in shop': {
        return 'bg-soft-warning';
      }
      default: {
        return 'bg-soft-success';
      }
    }
  }

  getIClass(statut: string) {
    switch (statut) {
      case 'inactive': {
        return 'bg-danger';
      }
      case 'in shop': {
        return 'bg-warning';
      }
      default: {
        return 'bg-success';
      }
    }
  }
}
