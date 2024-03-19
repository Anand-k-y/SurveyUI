import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiHandlerService } from '../Services/api-handler.service';
import { LoadingScreenComponent } from '../loading-screen/loading-screen.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData:FormGroup;
  returnData:boolean=false;
  isLoading = false;
  constructor(private route :Router,private apiCall:ApiHandlerService,private fb:FormBuilder,private dialog:MatDialog){
    this.loginData = this.fb.group({
      email:["",Validators.required],
      password:["",Validators.required]
    });
    
    if(sessionStorage.getItem("token")!=undefined || sessionStorage.getItem("token")!=null){
      if(sessionStorage.getItem("role")!='Administrator'){
        route.navigate(["/surveys"])
      }
      else{
      route.navigate(["/home"])
      }
    }
  }

login(data:any){

  if(data.email==""){
    this.returnData=true;
  }
  else{

    const dialogRef = this.dialog.open(LoadingScreenComponent);

this.apiCall.ValidateLogin(data).subscribe(result=>{
if(result.status==1){
  sessionStorage.setItem("token",result.token);
  sessionStorage.setItem("username",result.name);
  sessionStorage.setItem("role",result.designation);
  sessionStorage.setItem("id",result.id.toString());
  sessionStorage.setItem("area",result.agency);
  this.isLoading = false;
  dialogRef.close();
  window.location.reload();
 // this.route.navigate(["/surveys"])
}
else{
  this.isLoading = false;
this.returnData=true;
dialogRef.close();
}
})


  
  }
}
}
