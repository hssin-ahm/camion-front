import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { changeaAtuelBreadcrumb } from 'src/app/store/shared/shared.action';
import { DataTable } from 'simple-datatables';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import { MissionHistoryReq } from '../../models/missionHistoryReq.interface';
import { filterMissionBetweenTwoDate } from '../../state/mission.actions';
import { Observable } from 'rxjs';
import { getMissionsHistory } from '../../state/mission.selector';
import { SweetAlertService } from 'src/app/shared/modules/sweet-alert/sweet-alert.service';

@Component({
  selector: 'app-mission-history',
  templateUrl: './mission-history.component.html',
  styleUrls: ['./mission-history.component.scss'],
})
export class MissionHistoryComponent implements OnInit {
  hoveredDate: NgbDate | null = null;
  missions = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  constructor(
    private store: Store<AppState>,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private alert: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.changeBreadcrumb();

    this.store.select(getMissionsHistory).subscribe((data: any) => {
      this.missions = data?.missions;
      if (this.missions) {
        new Promise(() => {
          setTimeout(() => {
            const dataTable = new DataTable('#dataTableExample');
          }, 200);
        });
      }
    });
  }

  changeBreadcrumb() {
    this.store.dispatch(
      changeaAtuelBreadcrumb({
        item: 'Missions',
        itemActive: 'mission history',
      })
    );
  }

  search() {
    // format date

    const fromDate = this.formatFromData();
    const toDate = this.formatToData();

    const missionHistoryReq: MissionHistoryReq = {
      startDate: fromDate,
      endDate: toDate,
    };

    this.store.dispatch(filterMissionBetweenTwoDate({ missionHistoryReq }));
    this.store.select(getMissionsHistory).subscribe((data: any) => {
      this.missions = data?.missions;
      if (this.missions) {
        new Promise(() => {
          setTimeout(() => {
            const dataTable = new DataTable('#dataTableExample');
          }, 200);
        });
      }
    });
  }

  formatFromData() {
    return `${this.fromDate.year}-${
      ('' + this.fromDate.month).length == 2
        ? this.fromDate.month
        : '0' + this.fromDate.month
    }-${
      ('' + this.fromDate.day).length == 2
        ? this.fromDate.day
        : '0' + this.fromDate.day
    }`;
  }

  formatToData() {
    return `${this.toDate.year}-${
      ('' + this.toDate.month).length == 2
        ? this.toDate.month
        : '0' + this.toDate.month
    }-${
      ('' + this.toDate.day).length == 2
        ? this.toDate.day
        : '0' + this.toDate.day
    }`;
  }

  redirect(missionId) {
    console.log(missionId + '55');
  }

  // Date picker

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }
}
