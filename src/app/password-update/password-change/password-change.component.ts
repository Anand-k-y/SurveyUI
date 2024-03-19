import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ApiHandlerService } from 'src/app/Services/api-handler.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent {
  email:string="";
  constructor(
    public dialogRef: MatDialogRef<PasswordChangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data1: any,private apiCall:ApiHandlerService,
    private dialog: MatDialog
  ) {
    this.email = data1.value; // Assign the received value to the local variable
  }
}
