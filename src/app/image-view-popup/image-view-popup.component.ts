import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChannelDbmPopupComponent } from '../channel-dbm-popup/channel-dbm-popup.component';

@Component({
  selector: 'app-image-view-popup',
  templateUrl: './image-view-popup.component.html',
  styleUrls: ['./image-view-popup.component.css']
})
export class ImageViewPopupComponent  {

  id=0;
  n=0;
  @Input() imageSrc: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.imageSrc = this.data.imageSrc;
    debugger
    this.id=this.data.id;
    this.n = this.data.N;
    
  }

}
