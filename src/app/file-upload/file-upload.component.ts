import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiHandlerService } from '../Services/api-handler.service';
import { Router } from '@angular/router';
import { SuccessPopupComponent } from '../success-popup/success-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFile: File | undefined;
  isFileEmpty: boolean = false;
  constructor(private http: HttpClient,private api:ApiHandlerService,private route:Router,private dialog:MatDialog) {

    if(sessionStorage.getItem("token")==undefined || sessionStorage.getItem("token")==null){
      route.navigate(["/login"])
    }
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.checkFileEmpty();
  }

  checkFileEmpty() {
   
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result as string;
        this.isFileEmpty = fileContent.length === 0;
      };
   
      reader.readAsText(this.selectedFile);
    }
  } 
  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
this.api.ExcelUpload(formData).subscribe(
       result=>{
        if(result.status==1){
          const dialogRef = this.dialog.open(SuccessPopupComponent);
        }
        else{
          alert(result.message)
        } 
       }
        );
    }
  }
  DownloadFile(){
    const excelFilePath = 'assets/Sample.xlsx'; // Path to your Excel file in the assets folder

    this.http.get(excelFilePath, { responseType: 'blob' })
      .subscribe((blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sample.xlsx'; // Specify the desired file name here
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      });
  }
  refresh(){
    
  }
}
