import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SweetAlertService } from 'src/app/shared/modules/sweet-alert/sweet-alert.service';
import { AppState } from 'src/app/store/app.state';
import { changeaAtuelBreadcrumb } from 'src/app/store/shared/shared.action';
import {
  deleteIntervention,
  getTruckInterventions,
  toggleInterventionPage,
} from '../state/intervention.action';
import { getTruckInterventionsSelector } from '../state/intervention.selector';

@Component({
  selector: 'app-intervention-list',
  templateUrl: './intervention-list.component.html',
  styleUrls: ['./intervention-list.component.scss'],
})
export class InterventionListComponent implements OnInit {
  @Output() interventionToggle: EventEmitter<[boolean, string]> =
    new EventEmitter();
  @Input('truck_id')
  truck_id: string | null;
  interventions$: Observable<any>;
  currentPage = 1;
  size = 5;
  searchPagination = false;

  searchField = [
    { key: 'invoice_ref', value: 'Invoice reference' },
    { key: 'type', value: 'Type' },
    { key: 'price', value: 'Price' },
    { key: 'description', value: 'Description' },
  ];
  selectedfield: any = null;
  fieldSearchValue: string;

  constructor(
    private store: Store<AppState>,
    private sweetAlert: SweetAlertService,
    private alert: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.getInterventions(this.currentPage, this.size);
    this.changeBreadcrumb();
  }

  getInterventions(page, limit, searchField?, value?) {
    this.store.dispatch(
      getTruckInterventions({
        truck_id: this.truck_id,
        page,
        limit,
        searchField,
        value,
      })
    );
    this.interventions$ = this.store.select(getTruckInterventionsSelector);
  }
  changeBreadcrumb() {
    this.store.dispatch(
      changeaAtuelBreadcrumb({
        item: 'Trucks',
        itemActive: 'List of interventions',
      })
    );
  }
  done() {
    this.getInterventions(
      this.currentPage,
      this.size,
      this.selectedfield,
      this.fieldSearchValue
    );
  }
  toggle(intervention_id?) {
    this.interventionToggle.emit([true, intervention_id]);
  }
  search(value: string) {
    if (value == '') {
      this.getInterventions(this.currentPage, this.size);
    } else if (this.selectedfield == null) {
      this.alert.openAlertMixin('Please select a field', 'top-end', 'info');
    } else {
      this.fieldSearchValue = value;
      this.getInterventions(
        this.currentPage,
        this.size,
        this.selectedfield,
        value
      );
    }
  }

  selectSize(event) {
    this.size = event.target.value;
    this.getInterventions(this.currentPage, this.size);
  }

  onDelete(id) {
    const page = this.currentPage;
    const limit = this.size;
    this.sweetAlert
      .onDelete('Are you sure?', "You won't be able to revert this!")
      .then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(
            deleteIntervention({ id, page, limit, truck_id: this.truck_id })
          );
        }
      });
  }
}
