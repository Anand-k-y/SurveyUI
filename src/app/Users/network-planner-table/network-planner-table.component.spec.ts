import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkPlannerTableComponent } from './network-planner-table.component';

describe('NetworkPlannerTableComponent', () => {
  let component: NetworkPlannerTableComponent;
  let fixture: ComponentFixture<NetworkPlannerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkPlannerTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkPlannerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
