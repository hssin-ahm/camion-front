import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SweetAlertService } from 'src/app/shared/modules/sweet-alert/sweet-alert.service';
import { AppState } from 'src/app/store/app.state';
import { changeaAtuelBreadcrumb } from 'src/app/store/shared/shared.action';
import { getTruck_id } from '../../state/add_truck.selector';
import { deleteFuel, getTruckFuels } from '../state/fuel.action';
import { getTruckFuelsSelector } from '../state/fuel.selector';

@Component({
  selector: 'app-fuel-list',
  templateUrl: './fuel-list.component.html',
  styleUrls: ['./fuel-list.component.scss'],
})
export class FuelListComponent implements OnInit {
  @Output() fuelToggle: EventEmitter<[boolean, string]> = new EventEmitter();
  @Input('truck_id') truck_id;
  fuels$: Observable<any>;
  currentPage = 1;
  size = 5;
  searchPagination = false;

  searchField = [
    { key: 'number_of_liter', value: 'Number of liter' },
    { key: 'price_liter', value: 'Price per liter' },
    { key: 'price_total', value: 'price_total' },
  ];
  selectedfield: any = null;
  fieldSearchValue: string;
  fuels;
  constructor(
    private store: Store<AppState>,
    private alert: SweetAlertService
  ) {}
  ngOnInit(): void {
    this.getFuels(this.currentPage, this.size);
    this.changeBreadcrumb();
  }

  getFuels(page, limit, searchField?, value?) {
    this.store.dispatch(
      getTruckFuels({
        truck_id: this.truck_id,
        page,
        limit,
        searchField,
        value,
      })
    );
    this.fuels$ = this.store.select(getTruckFuelsSelector);
    // .subscribe((data) => {
    //   this.fuels = data;
    // });
  }
  changeBreadcrumb() {
    this.store.dispatch(
      changeaAtuelBreadcrumb({
        item: 'Trucks',
        itemActive: 'List of fuels',
      })
    );
  }
  done() {
    this.getFuels(
      this.currentPage,
      this.size,
      this.selectedfield,
      this.fieldSearchValue
    );
  }
  toggle(Fuel_id?) {
    this.fuelToggle.emit([true, Fuel_id]);
  }
  search(value: string) {
    if (value == '') {
      this.getFuels(this.currentPage, this.size);
    } else if (this.selectedfield == null) {
      this.alert.openAlertMixin('Please select a field', 'top-end', 'info');
    } else {
      this.fieldSearchValue = value;
      this.getFuels(this.currentPage, this.size, this.selectedfield, value);
    }
  }

  selectSize(event) {
    this.size = event.target.value;
    this.getFuels(this.currentPage, this.size);
  }

  onDelete(id) {
    const page = this.currentPage;
    const limit = this.size;
    this.alert
      .onDelete('Are you sure?', "You won't be able to revert this!")
      .then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(
            deleteFuel({ id, page, limit, truck_id: this.truck_id })
          );
        }
      });
  }
}
