import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionCostComponent } from './intervention-cost.component';

describe('InterventionCostComponent', () => {
  let component: InterventionCostComponent;
  let fixture: ComponentFixture<InterventionCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterventionCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
