import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionTableComponent } from './mission-table.component';

describe('MissionTableComponent', () => {
  let component: MissionTableComponent;
  let fixture: ComponentFixture<MissionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
