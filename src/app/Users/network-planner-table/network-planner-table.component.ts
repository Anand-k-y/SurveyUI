import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { ApiHandlerService } from 'src/app/Services/api-handler.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-network-planner-table',
  templateUrl: './network-planner-table.component.html',
  styleUrls: ['./network-planner-table.component.css']
})
export class NetworkPlannerTableComponent {
  isLoading:boolean=true;
  users: User[] = [];
  id:number=0;
  currentPage = 1;
  pageSize = 20;
  totalUsers = 0;
  totalPages:number[] = [];
  totalpagenumbers:number=0;
  constructor(private userService: ApiHandlerService,private http:HttpClient,private route:Router) {
    if(sessionStorage.getItem("token")==undefined || sessionStorage.getItem("token")==null){
      route.navigate(["/login"])
    }
    if(sessionStorage.getItem("role")=='Surveyor'){
      route.navigate(["/surveys"])
    }
   }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    // this.http.get<PagedResult>("");
    this.isLoading=true;

    this.userService.getUsers(this.currentPage, this.pageSize).subscribe(response => {
      this.users = response.items;
      this.users=this.users.filter(u=>u.role=="NetworkPlanner")
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
      this.loadUsers();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages.length) {
      this.currentPage++;
      this.loadUsers();
    }
  }

  Delete(id:any){
    this.userService.DeleteUser(id).subscribe(result=>{
      if(result==1){
        this.ngOnInit();
      }
    })
  }

  DownloadExcel(){
this.userService.GetAllUsers("NetworkPlanner").subscribe(result=>{
  
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(result);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
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

      this.route.navigate(['UserEnrollment/NetworkPlanner/Form/'+id]);

  }
  onSelectChange(selectElement:any) {
    // this.role = this.dataGroup.controls['role'].value;
    var role = selectElement.target.value;
    debugger
    if (role == 'Administrator') {
      this.route.navigate(['/UserEnrollment/Administrator'])
    }if (role == 'NetworkPlanner') {
      this.route.navigate(['/UserEnrollment/NetworkPlanner'])
    }if (role == 'Contractor') {
      this.route.navigate(['/UserEnrollment/Contractor'])
    }if (role == 'Surveyor') {
      this.route.navigate(['/UserEnrollment/Surveyor'])
    }if(role == 'Dashboard'){
      this.route.navigate(['/dashboard'])
    }
    console.log(this.role);
  }
  role(role: any) {
    throw new Error('Method not implemented.');
  }
}
