import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeHierarchyLevelComponent } from './tree-hierarchy-level.component';

describe('TreeHierarchyLevelComponent', () => {
  let component: TreeHierarchyLevelComponent;
  let fixture: ComponentFixture<TreeHierarchyLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeHierarchyLevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeHierarchyLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
