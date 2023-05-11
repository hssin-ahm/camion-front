import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionTrackingComponent } from './mission-tracking.component';

describe('MissionTrackingComponent', () => {
  let component: MissionTrackingComponent;
  let fixture: ComponentFixture<MissionTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionTrackingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
