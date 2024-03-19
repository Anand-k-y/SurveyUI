import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiHandlerService } from '../Services/api-handler.service';

@Component({
  selector: 'app-otp-login',
  templateUrl: './otp-login.component.html',
  styleUrls: ['./otp-login.component.css']
})
export class OtpLoginComponent {
  returnData:boolean=false;
  data:boolean=false;
otp1:string='';
otp2:string='';
otp3:string='';
otp4:string='';
otp5:string='';
otp6:string='';
email:string;
otp:string="";
resultOTP:number=0;
@ViewChild('input1') input1!:  ElementRef<HTMLInputElement>;
@ViewChild('input2') input2!:  ElementRef<HTMLInputElement>;
@ViewChild('input3') input3!:  ElementRef<HTMLInputElement>;
@ViewChild('input4') input4!:  ElementRef<HTMLInputElement>;
@ViewChild('input5') input5!:  ElementRef<HTMLInputElement>;
@ViewChild('input6') input6!:  ElementRef<HTMLInputElement>;
  constructor(private route :Router,private apiCall:ApiHandlerService,private fb:FormBuilder){
 
    if(sessionStorage.getItem("token")!=undefined || sessionStorage.getItem("token")!=null){
      route.navigate(["/surveys"])
    }
    this.email="";
  }

login(){
this.otp=this.otp1+this.otp2+this.otp3+this.otp4+this.otp5+this.otp6

if(this.otp==this.resultOTP.toString()){
  this.route.navigate(["/surveys"]);

}
else{
this.returnData=true;
}
}

GetOTP(){
  this.apiCall.SendOTP(this.email).subscribe(result=>{
    debugger;;
    if(result.status==1){
      sessionStorage.setItem("token",result.token);
      sessionStorage.setItem("username",result.name);
      this.resultOTP=result.otp;
      this.data=true;
      
    }
  })
  
}

Check(currentInput:  HTMLInputElement, nextInput:  HTMLInputElement|null){
  const value = currentInput.value; 
    if (value.length === 1 && nextInput) {
      nextInput.focus();
    }
}
}
