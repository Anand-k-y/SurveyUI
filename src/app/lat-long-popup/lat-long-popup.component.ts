import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Survey } from '../Models/Surveys';

@Component({
  selector: 'app-lat-long-popup',
  templateUrl: './lat-long-popup.component.html',
  styleUrls: ['./lat-long-popup.component.css']
})
export class LatLongPopupComponent {
  urlString="https://www.google.com/maps/dir/"
  url="https://www.google.com/maps/dir/'26.77749145,75.82942465'/'26.777675,75.829457'";
  survey:Survey;
  constructor(private dialogRef: MatDialogRef<LatLongPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    debugger
   
    this.survey=data.value;
    this.url= this.urlString+"'"+this.survey.latitude+","+this.survey.longitude+"'/'"+this.survey.plannedLatitude+","+this.survey.plannedLongitude+"'";
  }



  onOkClick(): void {
    this.dialogRef.close(true); // You can pass true to indicate confirmation or success
  }
}
