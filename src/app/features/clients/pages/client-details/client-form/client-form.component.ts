import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SweetAlertService } from 'src/app/shared/modules/sweet-alert/sweet-alert.service';
import { AppState } from 'src/app/store/app.state';
import { changeaAtuelBreadcrumb } from 'src/app/store/shared/shared.action';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {
  @Input('client') client: any | null;

  buttonTooltip = 'Add client';
  constructor(
    private store: Store<AppState>,
    private ar: ActivatedRoute,
    private alert: SweetAlertService,
    private clientService: ClientService,
    private router: Router
  ) {}

  itemActive: string = 'Add client';

  client_id;

  ngOnInit(): void {
    this.client_id = this.ar.snapshot.params['id'];
    if (this.client_id) {
      this.itemActive = 'Update client';
      this.buttonTooltip = 'Update client';
    }
    this.changeBreadcrumb();
  }

  changeBreadcrumb() {
    this.store.dispatch(
      changeaAtuelBreadcrumb({
        item: 'clients',
        itemActive: this.itemActive,
      })
    );
  }

  submit(form: NgForm) {
    const client = form.value;
    if (client._id) {
      this.clientService.updateClient(client).subscribe(
        (data) => {
          this.alert.openAlertMixin(
            'successfully updatted',
            'top-end',
            'success'
          );
          this.buttonTooltip = 'Update client';
          this.router.navigate([`/clients`]);
        },
        (error: HttpErrorResponse) => {
          this.alert.openAlertMixin(`${error}`, 'top-end', 'error');
        }
      );
    } else {
      client._id = undefined;
      this.clientService.addClient(client).subscribe(
        (data) => {
          this.alert.openAlertMixin('successfully added', 'top-end', 'success');
          this.buttonTooltip = 'Update client';
          this.router.navigate([`/clients/client/${data?.data?._id}`]);
        },
        (error: HttpErrorResponse) => {
          this.alert.openAlertMixin(`${error}`, 'top-end', 'error');
        }
      );
    }
  }
}
