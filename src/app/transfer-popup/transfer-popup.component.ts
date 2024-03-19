import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ChannelDbmPopupComponent } from '../channel-dbm-popup/channel-dbm-popup.component';
import { User } from '../Models/User';
import { ApiHandlerService } from '../Services/api-handler.service';
import { SuccessPopupComponent } from '../success-popup/success-popup.component';

@Component({
  selector: 'app-transfer-popup',
  templateUrl: './transfer-popup.component.html',
  styleUrls: ['./transfer-popup.component.css']
})
export class TransferPopupComponent {
  surveyId: number[];
  surveyorList: User[] = [];
  toId=0;
  constructor(
    public dialogRef: MatDialogRef<ChannelDbmPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private apiService:ApiHandlerService,private dialog:MatDialog
  ) {
    this.surveyId = data.value; // Assign the received value to the local variable
  }

  ngOnInit(): void {
    this.apiService.GetSurveyors().subscribe(result => {
      this.surveyorList = result;
     
    })
  }
  onSelectionChange(selectedValue: any) {
    debugger
    this.toId = Number(selectedValue.target.value);

  }
  Transfer(){
    debugger
    this.apiService.TransferSurveys(this.surveyId, this.toId).subscribe(result => {
      if(result==1){
        const dialogRef = this.dialog.open(SuccessPopupComponent);
        this.dialogRef.close()
      }
    })
//    this.apiService.TransferSurvey(this.surveyId,this.toId).subscribe(result=>{
//     debugger
// if(result==1){
//   this.dialog.open(SuccessPopupComponent);
//   this.dialogRef.close()
// }
// })
  }
}
