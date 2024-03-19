import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiHandlerService } from '../Services/api-handler.service';

@Component({
  selector: 'app-app-pop-up',
  templateUrl: './app-pop-up.component.html',
  styleUrls: ['./app-pop-up.component.css']
})
export class AppPopUpComponent {
  newRowData: any = {}; // Store the new row data
type="";
bool:boolean;
  constructor(
    private apiservice:ApiHandlerService,
    public dialogRef: MatDialogRef<AppPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
    this.newRowData = { ...data.row }; // Create a copy of the row data
     this.type = data.type,
     this.bool = data.bool
   }

  onSaveClick(): void {
    if(this.type=='AreaType'){

      this.apiservice.UpdateAreaType(this.newRowData).subscribe(result=>{
        if(result==1){
          alert("Success")
          this.dialogRef.close();
        }
        else{
          alert(result);
          this.dialogRef.close();
        }
      })
    } else if(this.type=='InstallationType'){
      this.apiservice.UpdateInstallationType(this.newRowData).subscribe(result=>{
        if(result==1){
          alert("Success")
          this.dialogRef.close();
        }
        else{
          alert(result);
          this.dialogRef.close();
        }
      })
    } else if(this.type=='Obstacle'){
      this.apiservice.UpdateObstacles(this.newRowData).subscribe(result=>{
        if(result==1){
          alert("Success")
          this.dialogRef.close();
        }
        else{
          alert(result);
          this.dialogRef.close();
          
        }
      })
    } else if(this.type=='AppVersion'){
      this.apiservice.UpdateVersion(this.newRowData).subscribe(result=>{
        if(result==1){
          alert("Success")
          this.dialogRef.close();
        }
        else{
          alert(result);
          this.dialogRef.close();
          
        }
      })
    }
   
  }
  onAddClick(){
    if(this.type=='AreaType'){

      this.apiservice.AddAreaType(this.newRowData).subscribe(result=>{
        if(result==1){
          alert("Success")
          this.dialogRef.close();
        }
        else{
          alert(result);
          this.dialogRef.close();
        }
      })
    } else if(this.type=='InstallationType'){
      this.apiservice.AddInstallationType(this.newRowData).subscribe(result=>{
        if(result==1){
          alert("Success")
          this.dialogRef.close();
        }
        else{
          alert(result);
          this.dialogRef.close();
        }
      })
    } else if(this.type=='Obstacle'){
      this.apiservice.AddObstacles(this.newRowData).subscribe(result=>{
        if(result==1){
          alert("Success")
          this.dialogRef.close();
        }
        else{
          alert(result);
          this.dialogRef.close();
          
        }
      })
    }
   
  }
  onCancelClick(): void {
    
    this.dialogRef.close();
  }
}
