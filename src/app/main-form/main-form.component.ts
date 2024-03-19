import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../Models/User';
import { ApiHandlerService } from '../Services/api-handler.service';
import { PasswordPopupComponent } from '../password-update/password-popup/password-popup.component';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css'],
})
export class MainFormComponent {
  isDisabled: boolean = true;
  dataGroup!: FormGroup;
  update: boolean = false;
  id: number = 0;
  rolename: string | null = '';
  user: User = {
    id: 0,
    isActive: 0,
    isDeleted: 0,
    creationDate: '',
    modificationDate: '',
    loggedStatus: 0,
    lastLoginTime: '',
    name: '',
    mobileNo: '',
    email: '',
    address: '',
    password: '',
    agencyName: '',
    areaAssigned: '',
    contractor: 0,
    contactPerson: '',
    deviceId: '',
    role: '',
    isBridgeUser:0,
    isSurveyUser:0,
    bridgeRole:"",
    otpByPass:1
  };
  contractors: User[] = [];
  role: string = '';
  constructor(
    private fb: FormBuilder,
    private apiService: ApiHandlerService,
    private route: Router,
    private active: ActivatedRoute,
    public dialog: MatDialog
  ) {
    if (
      sessionStorage.getItem('token') == undefined ||
      sessionStorage.getItem('token') == null
    ) {
      route.navigate(['/login']);
    }
    this.id = Number(this.active.snapshot.paramMap.get('id'));
    this.dataGroup = this.fb.group({
      id: [0],
      isActive: [0],
      isDeleted: [0],
      creationDate: [''],
      ModificationDate: [''],
      LoggedStatus: [0],
      LastLoginTime: [''],
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      role: ['Administrator', Validators.required],
      address: ['', Validators.required],
      mobileNo: [
        '',
        [
          Validators.required,
          this.mobileNumberValidator,
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      agencyName: ['', Validators.required],
      areaAssigned: ['', Validators.required],
      contractor: [0, Validators.required],
      contactPerson: ['', Validators.required],
      deviceId: ['', Validators.required],
      otpByPass:[1]
    });

    if (this.id > 0) {
      this.update = true;
      apiService.GetUserById(this.id).subscribe((result) => {
        this.user = result;
        this.dataGroup = this.fb.group({
          id: [this.user.id],
          isActive: [0],
          isDeleted: [0],
          creationDate: [''],
          ModificationDate: [''],
          LoggedStatus: [0],
          LastLoginTime: [''],
          name: [this.user.name, Validators.required],
          password: ['****************', Validators.required],
          email: [
            this.user.email,
            Validators.compose([Validators.required, Validators.email]),
          ],
          role: [this.user.role, Validators.required],
          address: [this.user.address, Validators.required],
          mobileNo: [
            this.user.mobileNo,
            [
              Validators.required,
              this.mobileNumberValidator,
              Validators.pattern('^[0-9]*$'),
            ],
          ],
          agencyName: [this.user.agencyName, Validators.required],
          areaAssigned: [this.user.areaAssigned, Validators.required],
          contractor: [this.user.contractor, Validators.required],
          contactPerson: [this.user.contactPerson, Validators.required],
          deviceId: [this.user.deviceId, Validators.required],
          otpByPass:[1]
        });
      });
    }
  }
  mobileNumberValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const mobileNumberPattern = /^\d{10}$/; // Assuming the mobile number should have exactly 10 digits
    const isValid = mobileNumberPattern.test(control.value);
    return isValid ? null : { invalidMobileNumber: true };
  }
  Register(data: FormGroup) {
    // this.apiService.RegisterUser(data,this.isSurveyChecked==true?1:0,this.isBridgeChecked==true?1:0,this.bridgeRole.toString()).subscribe((result) => {
    //   if (result == 1) {
    //     this.route.navigate(['/UserEnrollment/Administrator']);
    //   } else {
    //     alert('Email Already Exists ');
    //   }
    // });
  }
  Update(data: FormGroup) {
    this.apiService.UpdateUser(data).subscribe((result) => {
      if (result == 1) {
        this.route.navigate(['/UserEnrollment/Administrator']);
      } else {
        alert('Failed to Update');
      }
    });
  }
  openPopup(msg: any): void {
    const dialogRef = this.dialog.open(PasswordPopupComponent, {
      width: '350px',

      data: { value: msg }, // Pass the value to the PopupComponent
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
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
}
