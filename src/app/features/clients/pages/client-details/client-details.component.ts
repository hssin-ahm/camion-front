import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Location } from '@angular/common';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
})
export class ClientDetailsComponent implements OnInit {
  index: number;
  client_id: string;
  client$: Observable<any> | null;

  tabs = [0];
  selected = new FormControl([0]);
  constructor(
    private store: Store<AppState>,
    private ar: ActivatedRoute,
    private location: Location,
    private clientService: ClientService
  ) {}
  ngOnInit(): void {
    this.client_id = this.ar.snapshot.params['id'];
    if (this.client_id) {
      this.getclient();
    }
  }

  getclient() {
    this.client$ = this.clientService.getSingleClient(this.client_id);

    this.client$.subscribe((data) => {
      if (data) {
        this.client_id = this.ar.snapshot.params['id'];
      } else {
        this.client_id = undefined;
      }
    });
  }

  switchUrl(index, id) {
    switch (index) {
      case 1:
        this.location.go(`clients/client/${id}/invoices`);
        break;
      case 2:
        this.location.go(`clients/client/${id}/tablets`);
        break;
      default:
        this.location.go(`clients/client/${id}`);
        break;
    }
  }

  selectedIndexChange($event) {
    this.selected.setValue($event);
  }
}
