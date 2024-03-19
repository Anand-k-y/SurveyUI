import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alertpopup',
  templateUrl: './alertpopup.component.html',
  styleUrls: ['./alertpopup.component.css']
})
export class AlertpopupComponent {
  constructor(private dialogRef: MatDialogRef<AlertpopupComponent>) {}

  onCancelClick(): void {
    this.dialogRef.close(false); // You can pass false to indicate cancellation
  }

  onOkClick(): void {
    this.dialogRef.close(true); // You can pass true to indicate confirmation or success
  }
}
