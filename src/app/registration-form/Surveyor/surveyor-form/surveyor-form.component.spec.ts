import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyorFormComponent } from './surveyor-form.component';

describe('SurveyorFormComponent', () => {
  let component: SurveyorFormComponent;
  let fixture: ComponentFixture<SurveyorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyorFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
