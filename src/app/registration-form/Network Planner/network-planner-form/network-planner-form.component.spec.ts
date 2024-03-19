import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkPlannerFormComponent } from './network-planner-form.component';

describe('NetworkPlannerFormComponent', () => {
  let component: NetworkPlannerFormComponent;
  let fixture: ComponentFixture<NetworkPlannerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkPlannerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkPlannerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
