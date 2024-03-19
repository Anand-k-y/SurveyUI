import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeHierarchyViewComponent } from './tree-hierarchy-view.component';

describe('TreeHierarchyViewComponent', () => {
  let component: TreeHierarchyViewComponent;
  let fixture: ComponentFixture<TreeHierarchyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeHierarchyViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeHierarchyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
