import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ApiHandlerService } from '../../Services/api-handler.service';
import { PasswordChangeComponent } from '../password-change/password-change.component';

@Component({
  selector: 'app-password-popup',
  templateUrl: './password-popup.component.html',
  styleUrls: ['./password-popup.component.css']
})
export class PasswordPopupComponent implements OnInit{
  email: string;
  returnData:boolean=false;
  data:boolean=false;
  otp1:string='';
  otp2:string='';
  otp3:string='';
  otp4:string='';
  otp5:string='';
  otp6:string='';
  otp:string="";
  resultOTP:number=0;
  @ViewChild('input1') input1!:  ElementRef<HTMLInputElement>;
  @ViewChild('input2') input2!:  ElementRef<HTMLInputElement>;
  @ViewChild('input3') input3!:  ElementRef<HTMLInputElement>;
  @ViewChild('input4') input4!:  ElementRef<HTMLInputElement>;
  @ViewChild('input5') input5!:  ElementRef<HTMLInputElement>;
  @ViewChild('input6') input6!:  ElementRef<HTMLInputElement>;
  constructor(
    public dialogRef: MatDialogRef<PasswordPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data1: any,private apiCall:ApiHandlerService,
    private dialog: MatDialog
  ) {
    this.email = data1.value; // Assign the received value to the local variable
  }

  ngOnInit(): void {

    // this.apiCall.GetOTP(this.email).subscribe(result=>{
     
    //     this.resultOTP=result;
    //     this.data=true;
        
      
    //})
    this.data=true;
  }
ConfirmOtp(){
  // this.otp=this.otp1+this.otp2+this.otp3+this.otp4+this.otp5+this.otp6
  //    console.log(this.otp);
  //    console.log(this.resultOTP);
     
// if(this.otp==this.resultOTP.toString()){
  const dialogRef1 = this.dialog.open(PasswordChangeComponent, {
    width: '350px',

    data: { value: this.email } // Pass the value to the PopupComponent
  });
  
  dialogRef1.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
  this.dialogRef.close();
// }
// else{
// this.returnData=true;
// }
}
  Check(currentInput:  HTMLInputElement, nextInput:  HTMLInputElement|null){
    const value = currentInput.value; 
      if (value.length === 1 && nextInput) {
        nextInput.focus();
      }
  }
}
