import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageViewPopupComponent } from './image-view-popup.component';

describe('ImageViewPopupComponent', () => {
  let component: ImageViewPopupComponent;
  let fixture: ComponentFixture<ImageViewPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageViewPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageViewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
