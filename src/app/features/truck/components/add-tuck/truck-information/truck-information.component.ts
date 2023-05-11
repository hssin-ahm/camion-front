import {
  Component,
  DoCheck,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import {
  DropzoneConfigInterface,
  DropzoneDirective,
} from 'ngx-dropzone-wrapper';
import { SweetAlertService } from 'src/app/shared/modules/sweet-alert/sweet-alert.service';

import { AppState } from 'src/app/store/app.state';
import {
  changeaAtuelBreadcrumb,
  setLoadingSpinner,
} from 'src/app/store/shared/shared.action';
import { environment } from 'src/environments/environment';
import { Truck } from '../../../models/truck.interface';
import { TruckModel } from '../../../models/truck_model.interface';
import { TruckService } from '../../../services/truck.service';
import {
  addTruck,
  AddTruckModel,
  loadTruckModel,
  updateTruck,
} from '../state/add_truck.action';
import { getTruck, getTruckModels } from '../state/add_truck.selector';

@Component({
  selector: 'app-truck-information',
  templateUrl: './truck-information.component.html',
  styleUrls: ['./truck-information.component.scss'],
})
export class TruckInformationComponent implements OnInit, DoCheck {
  @Input('truck') truck: Truck | null;
  status: boolean = true;
  buttonTooltip: string = 'Add truck';

  constructor(
    private store: Store<AppState>,
    private modalService: NgbModal,
    private ar: ActivatedRoute,

    private TrucksService: TruckService,
    private alert: SweetAlertService
  ) {}
  iStatusClass: string = null;

  statusItems = ['active', 'inactive', 'in shop'];
  transmissionItems = ['manuel', 'automatique'];
  fuelItems = ['Essence', 'Diesel', 'LPG', 'Electrique', 'Hybride'];

  models: TruckModel[] = null;

  tagItems = [];

  obligatoire = '*';
  basicModalCloseResult: string = '';
  imgBaseUrl = environment.imgUrl;
  itemActive: string = 'Add truck';

  truck_id;

  //DropZone
  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
  };
  @ViewChild(DropzoneDirective, { static: false })
  directiveRef?: DropzoneDirective;
  model_picture: string = null;
  selectedDate;
  ngOnInit(): void {
    if (this.ar.snapshot.params['id']) {
      this.buttonTooltip, (this.itemActive = 'Update Truck');
    }
    this.loadTruckModel();
    this.changeBreadcrumb();
  }
  ngDoCheck(): void {
    if (this.truck?.data.labels) {
      this.tagItems = this.truck.data.labels;
    }
    if (this.status) {
      this.onChange(this.truck?.data.statut);
    }
  }

  changeBreadcrumb() {
    this.store.dispatch(
      changeaAtuelBreadcrumb({
        item: 'Trucks',
        itemActive: this.itemActive,
      })
    );
  }

  submit(form: NgForm) {
    const truck = form.value;
    if (truck._id) {
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(updateTruck({ truck }));
    } else {
      truck._id = undefined;
      this.store.dispatch(addTruck({ truck }));
    }
  }
  onChange(statutValue) {
    if (statutValue) {
      this.status = false;
    }
    switch (statutValue) {
      case 'inactive': {
        this.iStatusClass = 'indicator bg-danger';
        break;
      }
      case 'active': {
        this.iStatusClass = 'indicator bg-success';
        break;
      }
      case 'in shop': {
        this.iStatusClass = 'indicator bg-warning';
        break;
      }
      default: {
        this.iStatusClass = null;
        break;
      }
    }
  }

  openBasicModal(content: TemplateRef<any>) {
    this.modalService
      .open(content, {})
      .result.then((result) => {
        this.basicModalCloseResult = 'Modal closed' + result;
      })
      .catch((res) => {});
  }

  onUploadError(event: any): void {
    console.log('onUploadError:', event);
  }

  onUploadSuccess(event: any): void {
    console.log('onUploadSuccess:', event[1].data);
    this.model_picture = event[1].data;
  }

  resetDropzoneUploads(): void {
    if (this.directiveRef) {
      this.directiveRef.reset();
    }
  }

  onAddTruckModel(modelForm: NgForm) {
    const model = modelForm.value;
    this.store.dispatch(setLoadingSpinner({ status: true }));

    this.TrucksService.addTruckModel(model).subscribe((data) => {
      this.store.dispatch(setLoadingSpinner({ status: false }));
      this.alert.openAlertMixin('successfully added', 'top-end', 'success');
      this.loadTruckModel();
    });
  }
  loadTruckModel() {
    this.store.dispatch(loadTruckModel());
    this.store.select(getTruckModels).subscribe((data: any) => {
      this.models = data.models;
    });
  }
}
