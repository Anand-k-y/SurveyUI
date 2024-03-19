import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelDbmPopupComponent } from './channel-dbm-popup.component';

describe('ChannelDbmPopupComponent', () => {
  let component: ChannelDbmPopupComponent;
  let fixture: ComponentFixture<ChannelDbmPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelDbmPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelDbmPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
