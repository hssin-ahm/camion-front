import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import {
  changeaAtuelBreadcrumb,
  setLoadingSpinner,
} from 'src/app/store/shared/shared.action';
import { Contract } from '../../../models/contract.interface';
import { Fournisseur } from '../../../models/founisseur.interface';
import {
  addContract,
  AddFounisseur,
  getTruckContract,
  loadFounisseurs,
  updateContract,
} from '../state/add_truck.action';
import {
  getFournisseurs,
  getTruckContractSelector,
} from '../state/add_truck.selector';
const states = ['leasing contract'];

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
})
export class ContractComponent implements OnInit {
  @Input('truck_id') truck_id: string | null;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : states
              .filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );
  itemActive: string = 'Add contract';

  constructor(private store: Store<AppState>, private modalService: NgbModal) {}
  statusItems = ['In progress', 'Expired_soon', 'Expired', 'Closed'];
  obligatoire = '*';
  fournisseurs: Fournisseur[];
  contract: Contract = null;

  ngOnInit(): void {
    this.loadFournisseurs();
    this.getTruckContract();
  }
  getTruckContract() {
    this.store.dispatch(getTruckContract({ truck_id: this.truck_id }));

    this.store.select(getTruckContractSelector).subscribe((contract: any) => {
      this.contract = contract?.data;
      if (this.contract != undefined) {
        this.itemActive = 'Update contract';
      }
      this.changeBreadcrumb();
    });
  }

  changeBreadcrumb() {
    this.store.dispatch(
      changeaAtuelBreadcrumb({
        item: 'Trucks',
        itemActive: this.itemActive,
      })
    );
  }

  submit(contractForm: NgForm) {
    const contract = contractForm.value;
    if (contract._id) {
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(updateContract({ contract }));
    } else {
      this.store.dispatch(addContract({ contract }));
    }
  }

  loadFournisseurs() {
    this.store.dispatch(loadFounisseurs());
    this.store.select(getFournisseurs).subscribe((data: any) => {
      this.fournisseurs = data.data;
    });
  }

  onAddFounisseur(fournisseurForm: NgForm) {
    const fournisseur = fournisseurForm.value;
    this.store.dispatch(AddFounisseur({ fournisseur }));
    this.loadFournisseurs();
  }

  openBasicModal(content: TemplateRef<any>) {
    this.modalService
      .open(content, {})
      .result.then((result) => {})
      .catch((res) => {});
  }
}
