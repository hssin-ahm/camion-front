import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SweetAlertService } from 'src/app/shared/modules/sweet-alert/sweet-alert.service';
import { AppState } from 'src/app/store/app.state';
import { changeaAtuelBreadcrumb } from 'src/app/store/shared/shared.action';
import { ClientService } from '../../services/client.service';
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent implements OnInit {
  clients: Observable<any>;
  currentPage = 1;
  size = 5;
  searchPagination = false;

  searchField = [
    { key: 'name', value: 'Name' },
    { key: 'mobile', value: 'Mobile' },
    { key: 'email', value: 'Email' },
    { key: 'adresse', value: 'Adresse' },
  ];
  selectedfield: any = null;
  fieldSearchValue: string;

  constructor(
    private store: Store<AppState>,
    private sweetAlert: SweetAlertService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.changeBreadcrumb();
    this.getClients(this.currentPage, this.size);
  }

  getClients(page, limit, searchField?, value?) {
    this.clients = this.clientService.getClients(
      page,
      limit,
      searchField,
      value
    );
  }

  done() {
    this.getClients(
      this.currentPage,
      this.size,
      this.selectedfield,
      this.fieldSearchValue
    );
  }
  search(value: string) {
    if (value == '') {
      this.getClients(this.currentPage, this.size);
    } else if (this.selectedfield == null) {
      this.sweetAlert.openAlertMixin(
        'Please select a search field',
        'top-end',
        'info'
      );
    } else {
      this.fieldSearchValue = value;
      this.getClients(this.currentPage, this.size, this.selectedfield, value);
    }
  }

  selectSize(event) {
    this.size = event.target.value;
    this.getClients(this.currentPage, this.size);
  }

  onDelete(id) {
    const page = this.currentPage;
    const limit = this.size;
    this.sweetAlert
      .onDelete('Are you sure?', "You won't be able to revert this!")
      .then((result) => {
        if (result.isConfirmed) {
          this.clientService.deleteClient(id).subscribe(
            (data) => {
              this.getClients(page, limit);
              this.sweetAlert.openAlertMixin(
                'successfully deleted',
                'top-end',
                'success'
              );
            },
            (error: HttpErrorResponse) => {
              this.sweetAlert.openAlertMixin(`${error}`, 'top-end', 'error');
            }
          );
        }
      });
  }

  changeBreadcrumb() {
    this.store.dispatch(
      changeaAtuelBreadcrumb({ item: 'Clients', itemActive: 'List of Clients' })
    );
  }
}
