import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeHierarchyMasterComponent } from './tree-hierarchy-master.component';

describe('TreeHierarchyMasterComponent', () => {
  let component: TreeHierarchyMasterComponent;
  let fixture: ComponentFixture<TreeHierarchyMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeHierarchyMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeHierarchyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
