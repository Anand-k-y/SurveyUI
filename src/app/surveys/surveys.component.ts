import { Component } from '@angular/core';
import { Survey } from '../Models/Surveys';
import { ApiHandlerService } from '../Services/api-handler.service';

import { MatDialog } from '@angular/material/dialog';
import { ChannelDbmPopupComponent } from '../channel-dbm-popup/channel-dbm-popup.component';
import { ImageViewPopupComponent } from '../image-view-popup/image-view-popup.component';
import { LoadingScreenComponent } from '../loading-screen/loading-screen.component';
import { User } from '../Models/User';
import { LatLongPopupComponent } from '../lat-long-popup/lat-long-popup.component';
import { GateWayPopupComponent } from '../gate-way-popup/gate-way-popup.component';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css']
})
export class SurveysComponent {
  userName="";
  isPresent=false;
  circle:string="";
subDivision="";
  subDivisions:string[]=[];
circles:string[]=[];
  users: User[] = [];
  isLoading:boolean=true;
  surveys: Survey[] = [];
  surveysAll: Survey[] = [];
  allSurveys: Survey[] = [];
  surveysDownloaded:Survey[]=[];
  imageArray:number=5;
  id:number=0;
  currentPage = 1;
  pageSize = 10;
  totalSurveys = 0;
  surveyorList: User[] = [];
  surveyorId = 0;
  totalPages:number[] = [];
  totalpagenumbers:number=0;
  role:string|null="";
  constructor(private userService: ApiHandlerService,public dialog: MatDialog,private route:Router,private http:HttpClient){
    if(sessionStorage.getItem("token")==undefined || sessionStorage.getItem("token")==null){
      route.navigate(["/login"])
    }
    this.role=sessionStorage.getItem("role");
   }
   selectedType: string = 'All';

   selectType(type: string) {
       this.selectedType = type;
      //  if(type=='Pending')
      //  this.surveys = this.surveysAll.filter(s=>s.jsonData=="NA");
      //  else if(type == 'Installed')
      //  this.surveys = this.surveysAll.filter(s=>s.jsonData!="NA");
      //  else if(type=="All")
      //  this.surveys = this.surveysAll;
      this.loadSurveys();
   }
  ngOnInit(): void {
    this.GetCircles();
    
    this.userService.GetSurveyors().subscribe(result => {
      this.surveyorList = result;
     
    })
    this.loadSurveys();
    
  }
  onCircleChange(selectedValue: any) {
  
     this.circle=selectedValue.target.value
     this.subDivisions=[];
     this.subDivision="";
     this.surveyorId =0;
     if(this.circle!=""){
    this.GetSubDivisions(selectedValue.target.value);
     }
    this.ngOnInit();
    
  }
  onSubDivisionChange(selectedValue: any) {
   

    this.subDivision = selectedValue.target.value; 
    this.surveyorId =0;
    this.ngOnInit();
    
  }
  onSelectionChange(selectedValue: any) {
    debugger;
    this.currentPage=1;
    this.surveyorId = Number(selectedValue.target.value);
    if (this.surveyorId != 0) {
      this.loadSurveys();
    }
    else {
      this.ngOnInit();
    }
  }
  loadSurveys(): void {
    const dialogRef = this.dialog.open(LoadingScreenComponent);
    
    this.userService.GetAllSurveys(this.currentPage, this.pageSize,this.circle,this.subDivision,this.surveyorId,this.selectedType).subscribe(response => {
      
      if(response.items.length==0){
        this.isLoading=false;
        this.isPresent=true;
        this.totalSurveys = response.totalItems;
        dialogRef.close();
        this.surveys = response.items;
        this.surveysAll = response.items;
      }
      else{

      this.surveys = response.items;
      this.surveysAll = response.items;
      this.totalSurveys = response.totalItems;
      this.isPresent=false;
      this.calculateTotalPages();
      dialogRef.close();
      }
      if(this.role=='Surveyor'){
        this.surveys = response.items.filter(s=>s.userId==Number(sessionStorage.getItem("id")));
      }
    });
    this.userService.getAllUsers().subscribe(response => {
      this.users = response;
      
    });
    
  }

  calculateTotalPages(): void {
    this.totalPages = [];
    this.totalpagenumbers = Math.ceil(this.totalSurveys / this.pageSize);
    for(let i =0;i<this.totalpagenumbers;i++){
      this.totalPages[i]=i+1;
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages.length) {
      this.currentPage = page;
      this.loadSurveys();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadSurveys();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages.length) {
      this.currentPage++;
      this.loadSurveys();
    }
  }

  Delete(id:any){
    this.userService.DeleteUser(id).subscribe(result=>{
      if(result==1){
        this.ngOnInit();
      }
    })
  }



  DownloadImage(Id:number,n:number){
   
  
    // Make the API call and receive the file response
   this.userService.GetSurveyImages(Id,n).subscribe(response => {
      // Create a temporary URL for the blob object

      const url = window.URL.createObjectURL(response);
  
      // Create a link element
      const link = document.createElement('a');
      link.href = url;
  
      // Extract the filename from the response headers or specify a default name
      const currentDate: Date = new Date();
      const formattedDate: string = currentDate.toISOString().replace(/[:.-]/g, '');
  
      // Set the filename variable
      const filename = 'IMG' + formattedDate;
      // Set the download attribute and filename
      link.setAttribute('download', filename);
  
      // Simulate a click on the link element to initiate the download
      document.body.appendChild(link);
      link.click();
  
      // Clean up the temporary URL and link element
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    });
  }
  ViewImage(Id:number,n:number){
   
  
    // Make the API call and receive the file response
   this.userService.GetSurveyImages(Id,n).subscribe(response => {
      // Create a temporary URL for the blob object

      const reader = new FileReader();
      
    reader.onload = () => {
      const dialogRef = this.dialog.open(ImageViewPopupComponent, {
        data: { imageSrc: reader.result,id : Id,N:n }
      });
      dialogRef.afterClosed().subscribe(() => {
        // Optional: Handle any actions after the dialog is closed
      });
    };
    reader.readAsDataURL(response);
    });
  }
  openMapPopup(msg:Survey): void {
    debugger
    const dialogRef = this.dialog.open(LatLongPopupComponent, {
      width: '400px',
      data: { value: msg } // Pass the value to the PopupComponent
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  //Opening Popup for Channel_Dbm Data
  openPopup(msg:any): void {
    const dialogRef = this.dialog.open(ChannelDbmPopupComponent, {
      width: '350px',

      data: { value: msg } // Pass the value to the PopupComponent
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  GetUsername(id:number):string{
 const user= this.users.filter(u=>u.id==id)[0].name;
return user;
  }
  GetSubDivisions(circle:string){
    this.userService.GetAllSubDivisions(circle).subscribe(response => {
      
      this.subDivisions=response;
      
    });
  }
  GetCircles(){
    this.userService.GetAllCircles().subscribe(response => {
      this.circles=response;
      
    });
  }

  Download(){
    const dialogRef = this.dialog.open(LoadingScreenComponent);
     
     this.userName="";
    this.userService.GetSurveys(this.circle,this.subDivision,this.surveyorId).subscribe(response => {
      
      this.allSurveys = response.items;
      if(this.surveyorId>0){
        this.userName= this.users.filter(u=>u.id==this.surveyorId)[0].name;
       
       }
       if(this.selectedType=='Pending')
       this.allSurveys = this.allSurveys.filter(s=>s.jsonData=="NA");
       else if(this.selectedType == 'Installed')
       this.allSurveys = this.allSurveys.filter(s=>s.jsonData!="NA");
       
       const name = this.selectedType+"_"+this.circle+"_"+this.subDivision+"_"+this.userName+"_Surveys"
       const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.allSurveys);
       const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
       const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
       dialogRef.close();
       this.saveAsExcelFile(excelBuffer, name);
       
    });
   
   
  


  }

  saveAsExcelFile(buffer: any, fileName: string): void {
   
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url: string = window.URL.createObjectURL(data);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = fileName + '.xlsx';
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
  }

  openGatewayPopup(msg:any): void {
    const dialogRef = this.dialog.open(GateWayPopupComponent, {
      width: '400px',

      data: { value: msg } // Pass the value to the PopupComponent
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ViewImages(imageCount:number,id:number){
    for (let i = 1; i<+ imageCount; i++) {
      
      
    }
  }
}
