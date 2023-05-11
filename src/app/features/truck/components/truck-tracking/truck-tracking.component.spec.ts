import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckTrackingComponent } from './truck-tracking.component';

describe('TruckTrackingComponent', () => {
  let component: TruckTrackingComponent;
  let fixture: ComponentFixture<TruckTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruckTrackingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
