import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyorTableComponent } from './surveyor-table.component';

describe('SurveyorTableComponent', () => {
  let component: SurveyorTableComponent;
  let fixture: ComponentFixture<SurveyorTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyorTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
