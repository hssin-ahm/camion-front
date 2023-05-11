import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData, ChartType, ChartConfiguration } from 'chart.js';
import { AppState } from 'src/app/store/app.state';
import { missionStatusStart } from '../../state/dashboard.actions';
import { getMissionStatusServiceSelector } from '../../state/dashboard.selector';
import { OBJ } from '../chartObtions';

@Component({
  selector: 'app-mission-status',
  templateUrl: './mission-status.component.html',
  styleUrls: ['./mission-status.component.scss'],
})
export class MissionStatusComponent implements OnInit {
  obj = OBJ;

  totalCompleteMission = null;
  totalIncompleteMission = null;
  totalInprogressMission = null;
  doughnutChartData: ChartData<'doughnut'>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(missionStatusStart());

    this.store
      .select(getMissionStatusServiceSelector)
      .subscribe((data: any) => {
        this.totalCompleteMission = data?.totalCompleteMission;
        this.totalIncompleteMission = data?.totalIncompleteMission;
        this.totalInprogressMission = data?.totalInprogressMission;
        this.doughnutChartData = this.function();
      });
  }
  /**
   * Doughnut chart
   */
  public doughnutChartOptions: ChartConfiguration['options'] = {
    aspectRatio: 1.5,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: this.obj.bodyColor,
          font: {
            size: 13,
            family: this.obj.fontFamily,
          },
        },
      },
    },
  };
  public doughnutChartLabels: string[] = [
    'Complete',
    'InComplete',
    'In progress',
  ];
  function() {
    const doughnutChartData: ChartData<'doughnut'> = {
      labels: this.doughnutChartLabels,
      datasets: [
        {
          label: 'Mission status',
          backgroundColor: [
            this.obj.primary,
            this.obj.danger,
            this.obj.warning,
          ],
          hoverBackgroundColor: [
            this.obj.primary,
            this.obj.danger,
            this.obj.warning,
          ],
          borderColor: this.obj.cardBg,
          hoverBorderColor: [this.obj.info, this.obj.info, this.obj.info],
          data: [
            this.totalCompleteMission,
            this.totalIncompleteMission,
            this.totalInprogressMission,
          ],
        },
      ],
    };
    return doughnutChartData;
  }

  public doughnutChartType: ChartType = 'doughnut';
}
