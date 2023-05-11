import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';
import { Fournisseur } from 'src/app/features/truck/models/founisseur.interface';
import { Intervention } from 'src/app/features/truck/models/intervention.interface';
import { TruckService } from 'src/app/features/truck/services/truck.service';
import { SweetAlertService } from 'src/app/shared/modules/sweet-alert/sweet-alert.service';
import { AppState } from 'src/app/store/app.state';
import {
  changeaAtuelBreadcrumb,
  setLoadingSpinner,
} from 'src/app/store/shared/shared.action';
import { AddFounisseur, loadFounisseurs } from '../../state/add_truck.action';
import { getFournisseurs } from '../../state/add_truck.selector';
import {
  addIntervention,
  getSinleIntervention,
  toggleInterventionPage,
  updateIntervention,
} from '../state/intervention.action';
import {
  getSigleIntervention,
  getTruckInterventionsSelector,
} from '../state/intervention.selector';

const states = ['Washing', 'Vignette', 'Assurance', 'Repair'];

@Component({
  selector: 'app-intervention-form',
  templateUrl: './intervention-form.component.html',
  styleUrls: ['./intervention-form.component.scss'],
})
export class InterventionFormComponent implements OnInit {
  @Output() interventionToggle: EventEmitter<[boolean, string?]> =
    new EventEmitter();
  @Input('truck_id') truck_id: string | null;
  @Input('intervention_id') intervention_id: string | null;
  @Input('disable_icon') disable_icon: boolean | null;

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
  itemActive: string = 'Add Intervention';

  constructor(
    private store: Store<AppState>,
    private modalService: NgbModal,
    private ar: ActivatedRoute,
    private TrucksService: TruckService,
    private alert: SweetAlertService
  ) {}
  statusItems = ['In progress', 'Expired_soon', 'Expired', 'Closed'];
  obligatoire = '*';
  fournisseurs: Fournisseur[];
  intervention: Intervention;

  ngOnInit(): void {
    this.loadFournisseurs();
    this.getIntervention();
  }
  getIntervention() {
    if (this.intervention_id) {
      this.store.dispatch(
        getSinleIntervention({ intervention_id: this.intervention_id })
      );

      this.store.select(getSigleIntervention).subscribe((intervention: any) => {
        this.intervention = intervention?.data;
      });
      this.itemActive = 'Update intervention';
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
        this.interventionToggle.emit([false]);
      }, 200);
    });
  }
  submit(interventionForm: NgForm) {
    const intervention = interventionForm.value;
    if (intervention._id) {
      this.store.dispatch(updateIntervention({ intervention }));
    } else {
      intervention._id = undefined;
      this.store.dispatch(addIntervention({ intervention }));
    }
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.toggle();
  }

  loadFournisseurs() {
    this.store.dispatch(loadFounisseurs());
    this.store.select(getFournisseurs).subscribe((data: any) => {
      this.fournisseurs = data.data;
    });
  }

  onAddFounisseur(fournisseurForm: NgForm) {
    const fournisseur = fournisseurForm.value;
    this.store.dispatch(setLoadingSpinner({ status: true }));

    return this.TrucksService.addFounisseur(fournisseur).subscribe((date) => {
      this.store.dispatch(setLoadingSpinner({ status: false }));

      this.alert.openAlertMixin('successfully added', 'top-end', 'success');
      this.loadFournisseurs();
    });
  }

  openBasicModal(content: TemplateRef<any>) {
    this.modalService
      .open(content, {})
      .result.then((result) => {})
      .catch((res) => {});
  }
}
