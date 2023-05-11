import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SweetAlertService } from 'src/app/shared/modules/sweet-alert/sweet-alert.service';
import { AppState } from 'src/app/store/app.state';
import { changeaAtuelBreadcrumb } from 'src/app/store/shared/shared.action';
import { environment } from 'src/environments/environment';
import { deleteDriver, loadDrivers } from '../../state/driver.actions';
import { getDrivers } from '../../state/driver.selector';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.scss'],
})
export class DriverListComponent implements OnInit {
  drivers: Observable<any>;
  imgBaseUrl = environment.imgUrl;
  currentPage = 1;
  size = 5;
  searchPagination = false;

  searchField = [
    { key: 'first_name', value: 'First name' },
    { key: 'last_name', value: 'Last name' },
    { key: 'phone_number', value: 'Phone Number' },
    { key: 'adresse', value: 'Adresse' },
    { key: 'email', value: 'Email' },
  ];
  selectedfield: any = null;
  fieldSearchValue: string;

  constructor(
    private store: Store<AppState>,
    private sweetAlert: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.changeBreadcrumb();
    this.getDrivers(this.currentPage, this.size);
  }

  getDrivers(page, limit, searchField?, value?) {
    this.store.dispatch(loadDrivers({ page, limit, searchField, value }));
    this.drivers = this.store.select(getDrivers);
  }

  done() {
    this.getDrivers(
      this.currentPage,
      this.size,
      this.selectedfield,
      this.fieldSearchValue
    );
  }
  search(value: string) {
    if (value == '') {
      this.getDrivers(this.currentPage, this.size);
    } else if (this.selectedfield == null) {
      this.sweetAlert.openAlertMixin(
        'Please select a search field',
        'top-end',
        'info'
      );
    } else {
      this.fieldSearchValue = value;
      this.getDrivers(this.currentPage, this.size, this.selectedfield, value);
    }
  }

  selectSize(event) {
    this.size = event.target.value;
    this.getDrivers(this.currentPage, this.size);
  }

  onDelete(id) {
    const page = this.currentPage;
    const limit = this.size;
    this.sweetAlert
      .onDelete('Are you sure?', "You won't be able to revert this!")
      .then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(deleteDriver({ id, page, limit }));
        }
      });
  }

  changeBreadcrumb() {
    this.store.dispatch(
      changeaAtuelBreadcrumb({ item: 'Drivers', itemActive: 'List of Drivers' })
    );
  }
}
