import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SweetAlertService } from 'src/app/shared/modules/sweet-alert/sweet-alert.service';
import { AppState } from 'src/app/store/app.state';
import { changeaAtuelBreadcrumb } from 'src/app/store/shared/shared.action';
import { environment } from 'src/environments/environment';
import { deleteAdmin, loadAdmins } from '../../state/admin.actions';
import { getAdmins } from '../../state/admin.selector';

// import { io } from 'socket.io-client';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
})
export class AdminListComponent implements OnInit {
  admins: Observable<any>;
  imgBaseUrl = environment.imgUrl;
  currentPage = 1;
  size = 5;
  searchPagination = false;

  searchField = [
    { key: 'first_name', value: 'First name' },
    { key: 'last_name', value: 'Last name' },
    { key: 'email', value: 'Email' },
  ];
  selectedfield: any = null;
  fieldSearchValue: string;
  socket;
  constructor(
    private store: Store<AppState>,
    private sweetAlert: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.changeBreadcrumb();
    this.getAdmins(this.currentPage, this.size);
    // this.socket.on('newUserConnect', () => {
    //   console.log('dsfdsf');

    //   this.getAdmins(this.currentPage, this.size);
    // });
  }

  getAdmins(page, limit, searchField?, value?) {
    this.store.dispatch(loadAdmins({ page, limit, searchField, value }));
    this.admins = this.store.select(getAdmins);
  }

  done() {
    this.getAdmins(
      this.currentPage,
      this.size,
      this.selectedfield,
      this.fieldSearchValue
    );
  }
  search(value: string) {
    if (value == '') {
      this.getAdmins(this.currentPage, this.size);
    } else if (this.selectedfield == null) {
      this.sweetAlert.openAlertMixin(
        'Please select a search field',
        'top-end',
        'info'
      );
    } else {
      this.fieldSearchValue = value;
      this.getAdmins(this.currentPage, this.size, this.selectedfield, value);
    }
  }

  selectSize(event) {
    this.size = event.target.value;
    this.getAdmins(this.currentPage, this.size);
  }

  onDelete(id) {
    const page = this.currentPage;
    const limit = this.size;
    this.sweetAlert
      .onDelete('Are you sure?', "You won't be able to revert this!")
      .then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(deleteAdmin({ id, page, limit }));
        }
      });
  }

  changeBreadcrumb() {
    this.store.dispatch(
      changeaAtuelBreadcrumb({ item: 'Admins', itemActive: 'List of admins' })
    );
  }
}
