import { Component } from '@angular/core';
import { ApiHandlerService } from '../Services/api-handler.service';
import { User } from '../Models/User';
import { HttpClient } from '@angular/common/http';
import { PagedResult } from '../Models/PagedResult';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { LoadingScreenComponent } from '../loading-screen/loading-screen.component';
import { AlertpopupComponent } from '../alertpopup/alertpopup.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isLoading:boolean=true;
  index=0;
  users: User[] = [];
  id:number=0;
  currentPage = 1;
  pageSize = 20;
  totalUsers = 0;
  totalPages:number[] = [];
  totalpagenumbers:number=0;
  UserRole:string|null="";
  constructor(private userService: ApiHandlerService,private http:HttpClient,private route:Router,private dialog:MatDialog) {
    if(sessionStorage.getItem("token")==undefined || sessionStorage.getItem("token")==null){
      route.navigate(["/login"])
    }
    if(sessionStorage.getItem("role")=='Surveyor'){
      route.navigate(["/surveys"])
    }
    this.UserRole= sessionStorage.getItem("role");
   }

  ngOnInit(): void {
    this.loadUsers("");
  }

  loadUsers(role:string): void {
    // this.http.get<PagedResult>("");
    this.isLoading=true;
    const dialogRef = this.dialog.open(LoadingScreenComponent);
    this.userService.getUsers(this.currentPage, this.pageSize).subscribe(response => {
      this.users = response.items;
      if(role!=""){
        this.users=this.users.filter(u=>u.role==role)
      }
     dialogRef.close();
      this.totalUsers = response.totalItems;
      this.isLoading=false;
      this.calculateTotalPages();
    });
  }

  calculateTotalPages(): void {
    this.totalpagenumbers = Math.ceil(this.totalUsers / this.pageSize);
    for(let i =0;i<this.totalpagenumbers;i++){
      this.totalPages[i]=i+1;
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages.length) {
      this.currentPage = page;
      this.loadUsers("");
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers("");
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages.length) {
      this.currentPage++;
      this.loadUsers("");
    }
  }

  Delete(id:any){
    const dialogRef = this.dialog.open(AlertpopupComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.userService.DeleteUser(id).subscribe(result=>{
          if(result==1){
            this.ngOnInit();
          }
        })
      } else if (result === false) {
        
      } else {
        
      }
    });
    
  }

  DownloadExcel(){
    const dialogRef = this.dialog.open(LoadingScreenComponent);
this.userService.GetAllUsers("All").subscribe(result=>{
  
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(result);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  dialogRef.close();
  this.saveAsExcelFile(excelBuffer, 'Userlist');
})

    
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

  OpenForm(id:number,role:string){
    debugger
    if(role=='Administrator'){
      this.route.navigate(['UserEnrollment/Administrator/Form/'+id]);
    }
    if(role=='Surveyor'){
      this.route.navigate(['UserEnrollment/Surveyor/Form/'+id]);
    }
    if(role=='NetworkPlanner'){
      this.route.navigate(['UserEnrollment/networkPlanner/Form/'+id]);
    }
    if(role=='Contractor'){
      this.route.navigate(['UserEnrollment/Contractor/Form/'+id]);
    }
  }
  refresh(){
    this.ngOnInit();
  }
  onSelectChange(selectElement:any) {
    // this.role = this.dataGroup.controls['role'].value;
    var role = selectElement.target.value;
    // debugger
    // if (role == 'Administrator') {
    //   this.route.navigate(['/UserEnrollment/Administrator'])
    // }if (role == 'NetworkPlanner') {
    //   this.route.navigate(['/UserEnrollment/NetworkPlanner'])
    // }if (role == 'Contractor') {
    //   this.route.navigate(['/UserEnrollment/Contractor'])
    // }if (role == 'Surveyor') {
    //   this.route.navigate(['/UserEnrollment/Surveyor'])
    // }if(role == 'Dashboard'){
    //   this.route.navigate(['/dashboard'])
    // }
    this.loadUsers(role);
    console.log(this.role);
  }
  role(role: any) {
    throw new Error('Method not implemented.');
  }

  
}
