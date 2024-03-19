import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchyUploadComponent } from './hierarchy-upload.component';

describe('HierarchyUploadComponent', () => {
  let component: HierarchyUploadComponent;
  let fixture: ComponentFixture<HierarchyUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HierarchyUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HierarchyUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
