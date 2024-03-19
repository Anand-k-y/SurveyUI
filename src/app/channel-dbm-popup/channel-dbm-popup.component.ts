import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-channel-dbm-popup',
  templateUrl: './channel-dbm-popup.component.html',
  styleUrls: ['./channel-dbm-popup.component.css']
})
export class ChannelDbmPopupComponent implements OnInit {

  value: string;

  constructor(
    public dialogRef: MatDialogRef<ChannelDbmPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.value = data.value; // Assign the received value to the local variable
  }

  ngOnInit(): void {
    
  }
}
