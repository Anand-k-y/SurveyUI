import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Models/User';
import { ApiHandlerService } from 'src/app/Services/api-handler.service';
import { PasswordPopupComponent } from 'src/app/password-update/password-popup/password-popup.component';

@Component({
  selector: 'app-contractor-form',
  templateUrl: './contractor-form.component.html',
  styleUrls: ['./contractor-form.component.css']
})
export class ContractorFormComponent {
  bridgeRole:string[]=[];
  isRF=false;
  isRS232=false;
  isBLE=false;
  isSurveyChecked=true;
  isBridgeChecked = false;
  dataGroup!: FormGroup;
  update: boolean = false;
  id: number = 0;
  circles:string[]=[];
  rolename:string|null="";
  user: User = {
    id: 0,
    isActive:0,
    isDeleted:0,
    creationDate:"",
    modificationDate:"",
    loggedStatus:0,
    lastLoginTime:"",
    name: "",
    mobileNo: "",
    email: "",
    address: "",
    password:"",
    agencyName:"",
    areaAssigned:"",
    contractor:0,
    contactPerson:"",
    deviceId:"",
    role:"",
    isBridgeUser:0,
    isSurveyUser:0,
    bridgeRole:"",
    otpByPass:1

  }
  UserRole="";
  Username=""
  UserId=0;
  contractors:User[]=[];
  role:string="";
  constructor(private fb: FormBuilder, private apiService: ApiHandlerService, private route: Router, private active: ActivatedRoute,public dialog: MatDialog) {
    if (sessionStorage.getItem("token") == undefined || sessionStorage.getItem("token") == null) {
      route.navigate(["/login"])
    }
    this.rolename=sessionStorage.getItem("role");
    apiService.GetContractors().subscribe(result=>{
      this.contractors=result;
    })
    this.GetCircles();
    this.Username=sessionStorage.getItem("username")||'';
    this.UserRole=sessionStorage.getItem("role")||'';
    this.UserId=Number(sessionStorage.getItem("id")||'0');
    this.id = Number(this.active.snapshot.paramMap.get("id"));

    this.dataGroup = this.fb.group({
      id: [0],
      isActive:[0],
      isDeleted:[0],
      creationDate:["NA"],
      ModificationDate:["NA"],
      LoggedStatus:[0],
      LastLoginTime:["NA"],
      name: ["", Validators.required],
      password: ["", Validators.required],
      email: ["", Validators.compose([
        Validators.required,
        Validators.email
      ])],
      role: ["Contractor", Validators.required],
      address: ["", Validators.required],
      mobileNo: ["", [Validators.required, this.mobileNumberValidator,Validators.pattern('^[0-9]*$')]],
      agencyName: ["", Validators.required],
      areaAssigned: ["", Validators.required],
      contractor: [0, Validators.required],
      contactPerson: ["", Validators.required],
      deviceId:["NA",Validators.required],
      otpByPass:[1],
      bridgeRole:[""],
      isBridgeUser:[0],
      isSurveyUser:[0]

    });
    
    if (this.id > 0) {
      this.role='Contractor';
      this.update = true;
      apiService.GetUserById(this.id).subscribe(result => {
        this.user = result;
        this.dataGroup = this.fb.group({
          id: [this.user.id],
          isActive:[this.user.isActive],
          isDeleted:[this.user.isDeleted],
          creationDate:[this.user.creationDate.toString()],
          ModificationDate:[""],
          LoggedStatus:[0],
          LastLoginTime:[this.user.lastLoginTime.toString()],
          name: [this.user.name, Validators.required],
          password: ["", Validators.required],
          email: [this.user.email, Validators.compose([
            Validators.required,
            Validators.email
          ])],
          role: [this.user.role, Validators.required],
          address: [this.user.address, Validators.required],
          mobileNo: [this.user.mobileNo, [Validators.required, this.mobileNumberValidator,Validators.pattern('^[0-9]*$')]],
          agencyName: [this.user.agencyName, Validators.required],
          areaAssigned: [this.user.areaAssigned, Validators.required],
          contractor: [this.user.contractor, Validators.required],
          contactPerson: [this.user.contactPerson, Validators.required],
          deviceId:[this.user.deviceId,Validators.required],
          otpByPass:[1],
          bridgeRole:[this.user.bridgeRole],
          isBridgeUser:[this.user.isBridgeUser],
          isSurveyUser:[this.user.isSurveyUser]
        });

        this.isSurveyChecked = this.user.isSurveyUser==1?true:false;
        this.isBridgeChecked = this.user.isBridgeUser==1?true:false;
        this.isRF = this.user.bridgeRole.includes("RF")?true:false;
        this.isRS232 = this.user.bridgeRole.includes("RS232")?true:false;
        this.isBLE = this.user.bridgeRole.includes("BLE")?true:false;
      })
    
      this.onSelectChange();
    }
    this.role=this.dataGroup.controls['role'].value;
  }

  OnSurveyCheck(){
    this.isSurveyChecked=!this.isSurveyChecked;
  }
  OnRFCheck(){
    this.isRF=!this.isRF;
    if(this.isRF){
      this.bridgeRole.push("RF");
    }
    if(!this.isRF){
      this.bridgeRole = this.bridgeRole.filter(role => role !== "RF");
    }
    console.log(this.bridgeRole);
  }
  OnRSCheck(){
    this.isRS232=!this.isRS232;
    if(this.isRS232){
      this.bridgeRole.push("RS232");
    }
    if(!this.isRS232){

      this.bridgeRole = this.bridgeRole.filter(role => role !== "RS232");
    }
    
    console.log(this.bridgeRole);
  }
  OnBLECheck(){
    this.isBLE=!this.isBLE;
    if(this.isBLE){
      this.bridgeRole.push("BLE");
    }
    if(!this.isBLE){

      this.bridgeRole = this.bridgeRole.filter(role => role !== "BLE");
    }
    
    console.log(this.bridgeRole);
  }
  OnBridgeCheck(){
    this.isBridgeChecked=!this.isBridgeChecked;
  }
  GetCircles(){
    this.apiService.GetAllCircles().subscribe(response => {
      this.circles=response;
      
    });
  }
  mobileNumberValidator(control: AbstractControl): { [key: string]: any } | null {
    const mobileNumberPattern = /^\d{10}$/; // Assuming the mobile number should have exactly 10 digits
    const isValid = mobileNumberPattern.test(control.value);
    return isValid ? null : { 'invalidMobileNumber': true };
  }
  
  Register(data: FormGroup) {

    this.apiService.RegisterUser(data,this.isSurveyChecked==true?1:0,this.isBridgeChecked==true?1:0,this.bridgeRole.toString()).subscribe(result => {
      if (result == 1) {
        this.route.navigate(["/dashboard"]);
      }
      else {

      }
    })
  }
  Update(data: FormGroup) {
    this.apiService.UpdateUser(data).subscribe(result => {
      if (result == 1) {
        this.route.navigate(["/dashboard"]);
      }
      else {

      }
    })
  }

  onSelectChange() {
    this.role = this.dataGroup.controls['role'].value;
    if (this.role == 'Administrator') {
      this.route.navigate(['/UserEnrollment/Administrator/Form/0'])
    }if (this.role == 'NetworkPlanner') {
      this.route.navigate(['/UserEnrollment/NetworkPlanner/Form/0'])
    }if (this.role == 'Contractor') {
      this.route.navigate(['/UserEnrollment/Contractor/Form/0'])
    }if (this.role == 'Surveyor') {
      this.route.navigate(['/UserEnrollment/Surveyor/Form/0'])
    }
    console.log(this.role);
  }

  openPopup(msg:any): void {
    const dialogRef = this.dialog.open(PasswordPopupComponent, {
      width: '350px',

      data: { value: msg } // Pass the value to the PopupComponent
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
