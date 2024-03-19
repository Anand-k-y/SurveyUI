import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPopUpComponent } from './app-pop-up.component';

describe('AppPopUpComponent', () => {
  let component: AppPopUpComponent;
  let fixture: ComponentFixture<AppPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
