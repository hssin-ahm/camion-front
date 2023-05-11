import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelCostComponent } from './fuel-cost.component';

describe('FuelCostComponent', () => {
  let component: FuelCostComponent;
  let fixture: ComponentFixture<FuelCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuelCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
