import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyorAssignmentComponent } from './surveyor-assignment.component';

describe('SurveyorAssignmentComponent', () => {
  let component: SurveyorAssignmentComponent;
  let fixture: ComponentFixture<SurveyorAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyorAssignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyorAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
