import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Fuel } from 'src/app/features/truck/models/fuel.interface';
import { AppState } from 'src/app/store/app.state';
import {
  changeaAtuelBreadcrumb,
  setLoadingSpinner,
} from 'src/app/store/shared/shared.action';
import { addFuel, getSinleFuel, updateFuel } from '../state/fuel.action';
import { getSigleFuel } from '../state/fuel.selector';

@Component({
  selector: 'app-fuel-form',
  templateUrl: './fuel-form.component.html',
  styleUrls: ['./fuel-form.component.scss'],
})
export class FuelFormComponent implements OnInit {
  @Output() fuelToggle: EventEmitter<[boolean, string?]> = new EventEmitter();
  @Input('truck_id') truck_id: string | null;
  @Input('fuel_id') fuel_id: string | null;
  @Input('disable_icon') disable_icon: boolean | null;

  itemActive: string = 'Add fuel';

  constructor(private store: Store<AppState>) {}
  obligatoire = '*';
  fuel: Fuel;

  ngOnInit(): void {
    this.getFuel();
  }
  getFuel() {
    if (this.fuel_id) {
      this.store.dispatch(getSinleFuel({ fuel_id: this.fuel_id }));

      this.store.select(getSigleFuel).subscribe((fuel: any) => {
        this.fuel = fuel?.data;
      });
      this.itemActive = 'Update fuel';
    }
    this.changeBreadcrumb();
  }
  changeBreadcrumb() {
    this.store.dispatch(
      changeaAtuelBreadcrumb({
        item: 'Trucks',
        itemActive: this.itemActive,
      })
    );
  }
  toggle() {
    new Promise(() => {
      setTimeout(() => {
        this.fuelToggle.emit([false]);
      }, 100);
    });
  }
  submit(fuelForm: NgForm) {
    const fuel = fuelForm.value;
    if (fuel._id) {
      fuel.price_total = fuel.price_liter * fuel.number_of_liter;
      this.store.dispatch(updateFuel({ fuel }));
    } else {
      fuel._id = undefined;
      this.store.dispatch(addFuel({ fuel }));
      this.toggle();
    }
    this.store.dispatch(setLoadingSpinner({ status: true }));

    this.toggle();
  }
}
