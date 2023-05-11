import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MissionService } from 'src/app/features/mission/services/mission.service';
import { deleteMission } from 'src/app/features/mission/state/mission.actions';
import { SweetAlertService } from 'src/app/shared/modules/sweet-alert/sweet-alert.service';
import { AppState } from 'src/app/store/app.state';
import { changeaAtuelBreadcrumb } from 'src/app/store/shared/shared.action';

@Component({
  selector: 'app-mission-history',
  templateUrl: './mission-history.component.html',
  styleUrls: ['./mission-history.component.scss'],
})
export class MissionHistoryComponent implements OnInit {
  @Input('client_id') client_id: String | null;

  missions: any;
  currentPage = 1;
  size = 5;
  searchPagination = false;

  searchField = [
    { key: 'name', value: 'Title' },
    { key: 'date', value: 'Date' },
    { key: 'start_location', value: 'Start location' },
    { key: 'end_location', value: 'End location' },
    { key: 'description', value: 'Description' },
  ];
  selectedfield: any = null;
  fieldSearchValue: string;

  constructor(
    private store: Store<AppState>,
    private alert: SweetAlertService,
    private missionService: MissionService
  ) {}

  ngOnInit(): void {
    this.getmission(this.currentPage, this.size);
    this.changeBreadcrumb();
  }

  getmission(page, limit, searchField?, value?) {
    this.missionService
      .getClientMission(this.client_id, page, limit, searchField, value)
      .subscribe((data: any) => {
        this.missions = data;
        console.log(data?.data);
      });
  }
  changeBreadcrumb() {
    this.store.dispatch(
      changeaAtuelBreadcrumb({
        item: 'Clients',
        itemActive: 'Mission history',
      })
    );
  }
  done() {
    this.getmission(
      this.currentPage,
      this.size,
      this.selectedfield,
      this.fieldSearchValue
    );
  }
  search(value: string) {
    if (value == '') {
      this.getmission(this.currentPage, this.size);
    } else if (this.selectedfield == null) {
      this.alert.openAlertMixin('Please select a field', 'top-end', 'info');
    } else {
      this.fieldSearchValue = value;
      this.getmission(this.currentPage, this.size, this.selectedfield, value);
    }
  }

  selectSize(event) {
    this.size = event.target.value;
    this.getmission(this.currentPage, this.size);
  }

  onDelete(id) {
    const page = this.currentPage;
    const limit = this.size;
    this.alert
      .onDelete('Are you sure?', "You won't be able to revert this!")
      .then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(deleteMission({ id, page, limit }));
        }
      });
  }
}
