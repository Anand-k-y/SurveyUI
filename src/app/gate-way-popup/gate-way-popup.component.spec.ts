import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateWayPopupComponent } from './gate-way-popup.component';

describe('GateWayPopupComponent', () => {
  let component: GateWayPopupComponent;
  let fixture: ComponentFixture<GateWayPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GateWayPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GateWayPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
