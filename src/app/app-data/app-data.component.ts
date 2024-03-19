import { Component } from '@angular/core';
import { AreaType } from '../Models/AreaType';
import { InstallationType } from '../Models/InstallationType';
import { Obstacles } from '../Models/Obstacles';
import { ApiHandlerService } from '../Services/api-handler.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppPopUpComponent } from '../app-pop-up/app-pop-up.component';
import { result } from 'lodash';
import { Router } from '@angular/router';
import { AppVersion } from '../Models/AppVersion';
import { SuccessPopupComponent } from '../success-popup/success-popup.component';
import { supportsScrollBehavior } from '@angular/cdk/platform';



@Component({
  selector: 'app-app-data',
  templateUrl: './app-data.component.html',
  styleUrls: ['./app-data.component.css']
})
export class AppDataComponent {
  showobsatcles: boolean = false;
 
  showAreaType: boolean = false;
  appVersions:string="";
  showInstallationType: boolean = false;
  showAppVersion = false;
  showOtpByPass = false;
  areaType:AreaType[]=[];
installationType:InstallationType[]=[];
obstacle:Obstacles[]=[];
  row: any;
constructor(private apiservice:ApiHandlerService,private dialog: MatDialog,private route:Router){
  if(sessionStorage.getItem("token")==undefined || sessionStorage.getItem("token")==null){
    route.navigate(["/login"])
  }
  if(sessionStorage.getItem("role")=='Surveyor'){
    route.navigate(["/surveys"])
  }
 this.LoadData();
}

LoadData(){
  this.apiservice.GetTypes().subscribe(
    result=>{
      this.areaType=result.areaTypes;
      this.installationType=result.installationTypes;
      this.obstacle=result.obstacles;
    }
  )

  this.apiservice.GetVersion().subscribe(result=>{
  //  if(result!=""){
  //       const dialog: MatDialogRef<SuccessPopupComponent> = this.dialog.open(SuccessPopupComponent);
  //  }
  debugger
this.appVersions=result

  })
}
editNodeVersion(appVersion:AppVersion){
  const dialogRef: MatDialogRef<AppPopUpComponent> = this.dialog.open(
    AppPopUpComponent,
    {
      width: '400px', // Adjust the width as needed
      data: {
        row: appVersion, // Pass the row data to the dialog
        type:"AppVersion",
      
      },
    }
  );

}
editAreaType(row: any){
  debugger;
  const dialogRef: MatDialogRef<AppPopUpComponent> = this.dialog.open(
    AppPopUpComponent,
    {
      width: '400px', // Adjust the width as needed
      data: {
        row: row, // Pass the row data to the dialog
        type:"AreaType",
        
      },
    }
  );

 
}
// deleteNodeArea(RowId:any){
//   debugger
// // const index = row.id;

// // console.log(index);
// this.apiservice.DeleteAreaType(RowId).subscribe(result=>{

//   if(RowId!==-1){
//     this.row.splice(index,1);
//   }
// })
// }
deleteAreaType(RowId: any) {
  debugger
  // Use findIndex to find the index of the element with the matching RowId
  // const index = this.row.findIndex((element: { id: any; }) => element.id === RowId);

  if (RowId.Id !== -1) {
    this.apiservice.DeleteAreaType(RowId).subscribe(
     result=>{
      if(result==1){
        alert("Success")
        this.LoadData();
      }else{
        alert("Not Deleted")
      }
     }
    );
  } else {
    // Handle the case where the RowId was not found in the array
    console.warn(`Element with RowId ${RowId} not found in the array.`);
  }
}

editNodeInstallation(row: any){
  debugger;
  const dialogRef: MatDialogRef<AppPopUpComponent> = this.dialog.open(
    AppPopUpComponent,
    {
      width: '400px', // Adjust the width as needed
      data: {
        row: row, // Pass the row data to the dialog
        type:"InstallationType",

      },
    }
  );
}
deleteInstallationType(RowId: any) {
  debugger
  // Use findIndex to find the index of the element with the matching RowId
  // const index = this.row.findIndex((element: { id: any; }) => element.id === RowId);

  if (RowId.Id !== -1) {
    this.apiservice.DeleteInstallationType(RowId).subscribe(
      result=>{
        if(result==1){
          alert("Success")
        this.LoadData();

        }else{
          alert("Not Deleted")
        }
       }
    );
  } else {
    // Handle the case where the RowId was not found in the array
    console.warn(`Element with RowId ${RowId} not found in the array.`);
  }
}
editNodeObstacle(row: any){
  debugger;
  const dialogRef: MatDialogRef<AppPopUpComponent> = this.dialog.open(
    AppPopUpComponent,
    {
      width: '400px', // Adjust the width as needed
      data: {
        row: row, // Pass the row data to the dialog
        type:"Obstacle",

      },
    }
  );
}
deleteObstacle(RowId: any) {
  debugger
  // Use findIndex to find the index of the element with the matching RowId
  // const index = this.row.findIndex((element: { id: any; }) => element.id === RowId);

  if (RowId.Id !== -1) {
    this.apiservice.DeleteObstacles(RowId).subscribe(
      result=>{
        if(result==1){
          alert("Success")
        this.LoadData();

        }else{
          alert("Not Deleted")
        }
       } 
    );
  } else {
    // Handle the case where the RowId was not found in the array
    console.warn(`Element with RowId ${RowId} not found in the array.`);
  }
}
openPopup(type:any){
  debugger;
  const dialogRef: MatDialogRef<AppPopUpComponent> = this.dialog.open(
    AppPopUpComponent,
    {
      width: '400px', // Adjust the width as needed
      data: {
      // Pass the row data to the dialog
        type:type,
        bool:true
      },
    }
  );

  dialogRef.afterClosed().subscribe((result) => {
  this.LoadData();
  });
}

SetAppVersion(){
  this.apiservice.SetVersion(this.appVersions).subscribe(result=>{
    if(result!=""){
      alert("SUCCESS!!!")
    }
  });
}
}
