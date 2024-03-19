import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatLongPopupComponent } from './lat-long-popup.component';

describe('LatLongPopupComponent', () => {
  let component: LatLongPopupComponent;
  let fixture: ComponentFixture<LatLongPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatLongPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatLongPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
