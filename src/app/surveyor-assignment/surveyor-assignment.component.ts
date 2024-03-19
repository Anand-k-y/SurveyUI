import { Component } from '@angular/core';
import { ApiHandlerService } from '../Services/api-handler.service';
import { SurveyImports } from '../Models/SurveyImports';
import { User } from '../Models/User';
import { MatDialog } from '@angular/material/dialog';
import { LoadingScreenComponent } from '../loading-screen/loading-screen.component';
import { SuccessPopupComponent } from '../success-popup/success-popup.component';
import { Router } from '@angular/router';
import { TransferPopupComponent } from '../transfer-popup/transfer-popup.component';
import { AlertpopupComponent } from '../alertpopup/alertpopup.component';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-surveyor-assignment',
  templateUrl: './surveyor-assignment.component.html',
  styleUrls: ['./surveyor-assignment.component.css']
})
export class SurveyorAssignmentComponent {
  userName="";
  role:string="";
  id=0;
  isLoading = false;
  pageSize = 10;
subDivisions:string[]=[];
circles:string[]=[];
circle:string="";
subDivision="";
  //Toggle tables
  showPendingSurveys: boolean = false;
  showUnassignedSurveys: boolean = false;

  //Pending Surveys Variables
  Pendingsurveys: SurveyImports[] = [];
  PendingsurveysById: SurveyImports[] = [];
  DownloadedSurveys: SurveyImports[] = [];
  currentPendingPage = 1;
  totalPendingUsers = 0;
  totalPendingPages: number[] = [];
  totalPendingpagenumbers: number = 0;

  //Unassigned Surveys variables
  UnassignedSurveys: SurveyImports[] = [];
  currentUnassignedPage = 1;
  totalUnassignedUsers = 0;
  totalUnassignedPages: number[] = [];
  totalUnassignedpagenumbers: number = 0;

  //CheckBox variables
  selectedRows: number[] = [];
  selectDeletedRows : number[] =[];
users:User[]=[];
  //Surveyors 
  surveyorList: User[] = [];
  surveyorId = 0;

  //Contractors List
  contractors:User[]=[];
  contractorId=0;
  contractorName="";
  
  selectAllChecked = false;
  selectAllDeleteChecked = false;
  rowCheckboxes: { [key: number]: boolean } = {};
  DeleterowCheckboxes: { [key: number]: boolean } = {};
  constructor(private apiService: ApiHandlerService ,private dialog:MatDialog,private route:Router) { 
    this.role = sessionStorage.getItem("role")||"";
    this.id = Number(sessionStorage.getItem("id")|| 0);
    if(sessionStorage.getItem("token")==undefined || sessionStorage.getItem("token")==null){
      route.navigate(["/login"])
    }
    if(sessionStorage.getItem("role")=='Surveyor'){
      route.navigate(["/surveys"])
    }

  }

  ngOnInit(): void {
    const dialogRef = this.dialog.open(LoadingScreenComponent);

    this.apiService.GetSurveyors().subscribe(result => {
      this.surveyorList = result;
     
    })
    this.apiService.GetContractors().subscribe(result=>{
      this.contractors=result;
    })
    this.loadPendingSurveys();
    this.loadUnassignedSurveys();
    this.GetCircles();
    this.apiService.getAllUsers().subscribe(response => {
    this.users = response;
    this.contractorName = this.users.find((u) => u.id == this.id)?.name || "";
    dialogRef.close();
    });
    
    
  }

  //Assign Surveyor
  onSelectionChange(selectedValue: any) {
    this.currentPendingPage=1;
    this.surveyorId = Number(selectedValue.target.value);
    if (this.surveyorId != 0) {
      this.loadPendingSurveys();
    }
    else {
      this.ngOnInit();
    }
  }
  // onContratorChange(selectedValue: any) {
  //   this.currentPendingPage=1;
  //   this.contractorId = Number(selectedValue.target.value);
  //   if (this.contractorId != 0) {
  //     this.loadPendingSurveys();
  //   }
  //   else {
  //     this.ngOnInit();
  //   }
  // }
  onPageChange(selectedValue: any) {
    
    this.pageSize = Number(selectedValue.target.value);
    this.loadUnassignedSurveys();
  }
  onPendingPageChange(selectedValue: any) {
    
    this.pageSize = Number(selectedValue.target.value);
    this.loadPendingSurveys();
  }
  onCircleChange(selectedValue: any) {
    
    this.circle=selectedValue.target.value
    this.GetSubDivisions(selectedValue.target.value);
    this.ngOnInit();
    
  }
  onSubDivisionChange(selectedValue: any) {
    

    this.subDivision = selectedValue.target.value; 
    this.ngOnInit();
    
  }

  loadPendingSurveys(): void {
    // this.http.get<PagedResult>("");
    this.apiService.GetPendingSurveys(this.currentPendingPage, this.pageSize,this.surveyorId,this.circle,this.subDivision).subscribe(response => {
      this.Pendingsurveys = response.items;
      this.PendingsurveysById = response.items;
      this.totalPendingUsers = response.totalItems;
      
      this.calculatePendingTotalPages();
    });


  }
  loadUnassignedSurveys(): void {
    // this.http.get<PagedResult>("");


    this.apiService.GetUnassignedSurveys(this.currentUnassignedPage, this.pageSize,this.circle,this.subDivision).subscribe(response => {
      
      this.UnassignedSurveys = response.items;
      this.totalUnassignedUsers = response.totalItems;
      this.calculateUnassignedTotalPages();
    });
  }


  calculatePendingTotalPages(): void {
    this.totalPendingpagenumbers = Math.ceil(this.totalPendingUsers / this.pageSize);
    this.totalPendingPages =[];
    for (let i = 0; i < this.totalPendingpagenumbers; i++) {
      this.totalPendingPages[i] = i + 1;
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPendingPages.length) {
      this.currentPendingPage = page;
      this.loadPendingSurveys();
    }
  }

  prevPage(): void {
    if (this.currentPendingPage > 1) {
      this.currentPendingPage--;
      this.loadPendingSurveys();
    }
  }

  nextPage(): void {
    if (this.currentPendingPage < this.totalPendingPages.length) {
      this.currentPendingPage++;
      this.loadPendingSurveys();
    }
  }
  calculateUnassignedTotalPages(): void {
    this.totalUnassignedpagenumbers = Math.ceil(this.totalUnassignedUsers / this.pageSize);
    for (let i = 0; i < this.totalUnassignedpagenumbers; i++) {
      this.totalUnassignedPages[i] = i + 1;
    }
  }

  goToUnassignedPage(page: number): void {
    if (page >= 1 && page <= this.totalUnassignedPages.length) {
      this.currentUnassignedPage = page;
      this.loadUnassignedSurveys();
    }
  }

  prevUnassignedPage(): void {
    if (this.currentUnassignedPage > 1) {
      this.currentUnassignedPage--;
      this.loadUnassignedSurveys();
    }
  }

  nextUnassignedPage(): void {
    if (this.currentUnassignedPage < this.totalUnassignedPages.length) {
      this.currentUnassignedPage++;
      this.loadUnassignedSurveys();
    }
  }

  //CheckBox functions

  onRowCheckboxChange(event: Event, id: number) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox && checkbox.checked) {
      // If the checkbox is checked, add the id to the selectedRows array
      this.selectedRows.push(id);
    } else {
      // If the checkbox is unchecked, remove the id from the selectedRows array
      this.selectedRows = this.selectedRows.filter((rowId) => rowId !== id);
    }
  }
  onDeleteRowCheckboxChange(event: Event, id: number) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox && checkbox.checked) {
      // If the checkbox is checked, add the id to the selectedRows array
      this.selectDeletedRows.push(id);
    } else {
      // If the checkbox is unchecked, remove the id from the selectedRows array
      this.selectDeletedRows = this.selectDeletedRows.filter((rowId) => rowId !== id);
    }
  }

  // Function to handle checkbox change for all rows (select all/none)
  selectAllRows(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox) {
      if (checkbox.checked) {
        // If the "select all" checkbox is checked, add all ids to the selectedRows array
        this.selectedRows = this.UnassignedSurveys.map((survey) => survey.uid);
      } else {
        // If the "select all" checkbox is unchecked, clear the selectedRows array
        this.selectedRows = [];
      }
    }
  }
  selectedType: string = 'contractor';

  selectType(type: string) {
      this.selectedType = type;
  }

  
  // Function to update the row checkbox state when the "Select All" checkbox is clicked
  updateAllRowCheckboxes() {
   
    this.UnassignedSurveys.forEach((survey) => {
      
      this.rowCheckboxes[survey.uid] = this.selectAllChecked;
    });
  }
  DeleteAllRowCheckboxes() {
    this.Pendingsurveys.forEach((survey) => {
      this.DeleterowCheckboxes[survey.uid] = this.selectAllDeleteChecked;
    });
  }

  // Function to check if all rows are checked
  areAllRowsChecked() {
    return this.UnassignedSurveys.every((survey) => this.rowCheckboxes[survey.uid]);
  }
  // Function to handle the submit button click
  submitSelectedRows() {
    const selectedRowIds = (Object.keys(this.rowCheckboxes).filter((id) => this.rowCheckboxes[Number(id)]));
    const selectedIdsAsNumbers = selectedRowIds.map((id) => parseInt(id, 10));

    if (selectedIdsAsNumbers.length == 0 || this.surveyorId == 0) {
      alert("No Survey or Surveyor Selected")
    }
    else {
      this.apiService.submitSelectedIds(selectedIdsAsNumbers, this.surveyorId).subscribe(result => {
        if(result==1){
          const dialogRef = this.dialog.open(SuccessPopupComponent);
          this.rowCheckboxes={};
          this.ngOnInit();
        }
      })
    }


  }
refresh(){
  this.circle="";
this.subDivision="";
this.surveyorId=0;
  this.ngOnInit();
}
  GetSubDivisions(circle:string){
    this.apiService.GetAllSubDivisions(circle).subscribe(response => {
      
      this.subDivisions=response;
      
    });
  }
  GetCircles(){
    this.apiService.GetAllCircles().subscribe(response => {
      this.circles=response;
      
    });
  }
    GetUsername(id:number):string{
    const user= this.users.filter(u=>u.id==id)[0].name;
   return user;
     }

     OpenForm(data:number[]){
      
        const dialogRef = this.dialog.open(TransferPopupComponent, {
          width: '350px',
    
          data: { value: data } // Pass the value to the PopupComponent
        });
    
        dialogRef.afterClosed().subscribe(result => {
          this.DeleterowCheckboxes={};
          this.ngOnInit();
        });
      
    }

    Delete(id:number){
      
    }
    DeleteAllSurveys(){
      const dialogRef = this.dialog.open(AlertpopupComponent, {
        width: '300px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          const selectedRowIds = (Object.keys(this.DeleterowCheckboxes).filter((id) => this.DeleterowCheckboxes[Number(id)]));
          const selectedIdsAsNumbers = selectedRowIds.map((id) => parseInt(id, 10));
          if (selectedIdsAsNumbers.length == 0 ) {
            alert("No Survey or Surveyor Selected")
          }
          else {
            this.apiService.DeleteSurveys(selectedIdsAsNumbers, this.surveyorId).subscribe(result => {
              if(result==1){
                const dialogRef = this.dialog.open(SuccessPopupComponent);
                this.DeleterowCheckboxes={};
                this.ngOnInit();
              }
            })
          }
        } else if (result === false) {
          
        } else {
         
        }
      });
     
    }
    TransferAllSurveys(){
      const selectedRowIds = (Object.keys(this.DeleterowCheckboxes).filter((id) => this.DeleterowCheckboxes[Number(id)]));
      const selectedIdsAsNumbers = selectedRowIds.map((id) => parseInt(id, 10));
      if (selectedIdsAsNumbers.length == 0 ) {
        alert("No Survey or Surveyor Selected")
      }
      else {
        this.OpenForm(selectedIdsAsNumbers);
       
        
      }
    }
    DeleteUnassingedSurveys(){

      const dialogRef = this.dialog.open(AlertpopupComponent, {
        width: '300px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          const selectedRowIds = (Object.keys(this.rowCheckboxes).filter((id) => this.rowCheckboxes[Number(id)]));
          const selectedIdsAsNumbers = selectedRowIds.map((id) => parseInt(id, 10));
          if (selectedIdsAsNumbers.length == 0 ) {
            alert("No Survey or Surveyor Selected")
          }
          else {
            this.apiService.DeleteSurveys(selectedIdsAsNumbers, this.surveyorId).subscribe(result => {
              if(result==1){
                const dialogRef = this.dialog.open(SuccessPopupComponent);
                this.DeleterowCheckboxes={};
                this.rowCheckboxes = {};
                this.ngOnInit();
              }
            })
          }

        } else if (result === false) {
          
        } else {
          
        }
      });

     
    }

    Download(){
    const dialogRef = this.dialog.open(LoadingScreenComponent);
    
     this.userName="";
    this.apiService.GetPendingSurveys(1, 0,this.surveyorId,this.circle,this.subDivision).subscribe(response => {
      
      this.DownloadedSurveys = response.items;
      if(this.surveyorId>0){
        this.userName= this.users.filter(u=>u.id==this.surveyorId)[0].name;
       
       }
       const name = this.circle+"_"+this.subDivision+"_"+this.userName+"_PendingSurveys"
       const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.DownloadedSurveys);
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
}
