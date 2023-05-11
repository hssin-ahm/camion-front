import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadMissions } from 'src/app/features/mission/state/mission.actions';
import { getMissions } from 'src/app/features/mission/state/mission.selector';
import { AppState } from 'src/app/store/app.state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mission-table',
  templateUrl: './mission-table.component.html',
  styleUrls: ['./mission-table.component.scss'],
})
export class MissionTableComponent implements OnInit {
  missions: Observable<any>;
  imgBaseUrl = environment.imgUrl;
  currentPage = 1;
  size = 5;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.getMissions(this.currentPage, this.size);
  }

  getMissions(page, limit) {
    this.store.dispatch(loadMissions({ page, limit }));
    this.missions = this.store.select(getMissions);
  }

  done() {
    this.getMissions(this.currentPage, this.size);
  }

  getSpanClass(statut: string) {
    switch (statut) {
      case 'Incomplete': {
        return 'badge bg-danger';
      }
      case 'In progress': {
        return 'badge bg-warning';
      }
      default: {
        return 'badge bg-primary';
      }
    }
  }
}
