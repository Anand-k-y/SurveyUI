import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-gate-way-popup',
  templateUrl: './gate-way-popup.component.html',
  styleUrls: ['./gate-way-popup.component.css']
})
export class GateWayPopupComponent {
  jsonData: string;
  parsedData: any;
  displayedColumns: string[] = ['key', 'value'];
  constructor(
    public dialogRef: MatDialogRef<GateWayPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.jsonData = data.value;
     // Assign the received value to the local variable
     debugger
    if(this.jsonData!="NA"){
    const tempData = JSON.parse(this.jsonData);
    this.parsedData = Object.keys(tempData).map(key => ({key: key, value: tempData[key]}));
    }
  }


}
