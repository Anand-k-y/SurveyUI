import { HttpClient } from '@angular/common/http';
import { ApiData } from '../Models/ApiData';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HierarchyServiceService } from '../Services/hierarchy-service.service';
import { HierarchyData } from '../Models/HierarchyData';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Page } from '../Models/Page';
import { LoadingScreenComponent } from '../loading-screen/loading-screen.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-hierarchy-upload',
  templateUrl: './hierarchy-upload.component.html',
  styleUrls: ['./hierarchy-upload.component.css'],
  //  animations:[fadeInOut]
})
export class HierarchyUploadComponent implements OnInit {
  @Input() reorderable: boolean = true;
  // @Input() externalPaging: boolean = true;
  selectedHierarchyName: string = ''; // Variable to store the selected hierarchy name
  public page: Page = new Page();
  onImportClick(row:any) {
    debugger
    console.log(row);
    
    this.hierarchyService.setSelectedHierarchyName(row.HierarchyName);
    this.hierarchyService.setSelectedHierarchyLevel(row.Hierarchy);
  }
  onViewClick(HierarchyName: string,Id:string,ParentId:string) {
    
    this.hierarchyService.setSelectedHierarchyName(HierarchyName);
  }

  [key: string]: any;
  tableData: ApiData[] = [];
  rows: any[] = [];
  columns: any[] = [];
  alertData: any = {
    currentState: this.router.url,
  };
  alertManageAction: any = {
    currentState: this.router.url,
  };
  hierarchyData: HierarchyData = {
    
    hierarchyData: {
      headingData: [],
      options: {
        colShowHideButton: true,
        export: true,
        filter: true,
        colapsive: true,
        download: true,
        showNumberOfItems: true,
        showPagination: true,
      },
      numberOfColumn: '',
      isGrouping: true,
      isShowSrNo: true,
      isEnableTranslation: true,
      isTransformModelForGrouping: true,
      linkColumnName: '',
      linkColumnName1: '',
      hoverColumn: '',
      linkCalculationColumn: '',
      expandGroupingRows: true,
      Actions: [],
      rowData: [],
      tableData: [],
      showCheckbox: true,
      serverPagination: true,
      showPaginationRow: true,
      Id: undefined,
      api: undefined,
      totalData:0
    },
    totalRecords: 0,
    pageSize: 10,
    // isClientSidePagination: true,
    sortColumnName: '$SortBy$',
    currentPage: 1,
  };
  currentPage = 1;
  pageSize = 10;
  totalUsers = 0;
  totalPages:number[] = [];
  totalpagenumbers:number=0;
  ImportResponse: string = '';
  showJobLoading: boolean = false;

  constructor(
    private router: Router,
    private hierarchyService: HierarchyServiceService,
    private dialog : MatDialog) {
      if(sessionStorage.getItem("token")==undefined || sessionStorage.getItem("token")==null){
        router.navigate(["/login"])
      }
      if(sessionStorage.getItem("role")=='Surveyor'){
        router.navigate(["/surveys"])
      }
     }

  ngOnInit() {
    this.getAll();
  }

  getAll() {

    const dialogRef = this.dialog.open(LoadingScreenComponent);
    const searchparam = {
      currentPage: this.currentPage,
      pageSize: this.pageSize,
    };
    this.hierarchyService.getTreeHierarchy(searchparam).subscribe((data) => {
   
      console.log(this.selectedHierarchyName);

      if (data.HierarchyGridData) {
     
        this.hierarchyData.hierarchyData = data.HierarchyGridData;
        this.hierarchyData.totalRecords = data.HierarchyGridData.totalData;
        this.hierarchyData.pageSize = this.page.pageSize;
        // this.hierarchyData.isClientSidePagination = true;
        this.hierarchyData.sortColumnName = '$SortBy$';
    //  this.hierarchyData.currentPage = this.page.currentPage
    this.totalUsers = data.HierarchyGridData.totalData;
    this.calculateTotalPages();
      }
      dialogRef.close()
      
    });
  }

  performAction(key: string, item: any) {
    this[key](item);
  }



  HierarchyManagement(p: any, text: string) {
    this.showJobLoading = true;
    this.hierarchyService.HierarchyManagement(p).subscribe(() => {
      this.showJobLoading = false;
      this.alertManageAction = {
        message: text + ' Success',
        showAlert: true,
        type: 'success',
      };
    });
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      this.getAll();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAll();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages.length) {
      this.currentPage++;
      this.getAll();
    }
  }
}
