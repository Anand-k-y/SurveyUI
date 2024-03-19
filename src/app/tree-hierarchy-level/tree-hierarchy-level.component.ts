import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HierarchyServiceService } from '../Services/hierarchy-service.service';
import { FileHandlerService } from '../Services/file-handler.service';
import { from } from 'rxjs/internal/observable/from';
import * as _ from 'lodash';
import * as XLSX from 'xlsx';
// import { TranslatePipe } from './path-to-translate-pipe';
// import _ from 'lodash';

@Component({
  selector: 'app-tree-hierarchy-level',
  templateUrl: './tree-hierarchy-level.component.html', // Replace with your template URL
  styleUrls: ['./tree-hierarchy-level.component.css'],
})
export class TreeHierarchyLevelComponent {
  HierarchyName: string | undefined;
  alertData = {
    currentState: this.router.routerState.snapshot.url,
  };

  isDownloading = false;
  isUploading = false;
  files: any[] = [];
  fileError = false;
  Hierarchy: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private hierarchyService: HierarchyServiceService,
    private fileHandlerService: FileHandlerService
  ) // private translatePipe: TranslatePipe
  {
    this.HierarchyName = this.hierarchyService.getSelectedHierarchyName();
    debugger
    this.Hierarchy = this.hierarchyService.getSelectedHierarchyLevel();
  }

  DownloadSampleFile(): void {
    //  debugger
    if (this.HierarchyName !== undefined || this.HierarchyName !== '') {
      const fileName = this.HierarchyName + '.xlsx';
      this.isDownloading = true;

      this.hierarchyService
        .downloadSampleFileForHierarchy(this.HierarchyName)
        .subscribe((data: Blob) => {
          const downloadUrl = URL.createObjectURL(data);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = this.HierarchyName + '.xlsx'; // Set the desired file name
          link.click();
          URL.revokeObjectURL(downloadUrl);
          this.isDownloading = false;
        });
    }
  }
  selectedFile: File|null =null;
  isFileEmpty: boolean = false;
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
    else{
      this.isFileEmpty=true;
    }
  } 
  UploadFile() {

    // if (this.files.length === 0) {
    //   this.fileError = true;
    this.checkFileEmpty()
   if(this.isFileEmpty){
    alert("Select File")
    return
   }
   if (!this.selectedFile) {
    alert("Select a file");
    return;
  }
   const reader: FileReader = new FileReader();
   reader.onload = (e: any) => {
     // Parse the Excel file
     const binaryData = e.target.result;
     const workbook = XLSX.read(binaryData, { type: 'binary' });
 
     // Extract data from the first sheet (assuming it's the one you want)
     const worksheet = workbook.Sheets[workbook.SheetNames[0]];

     // Define the columns you want to keep
     const columnsToKeep1 = this.Hierarchy.split("->"); // Replace with your actual column names
     const columnsToKeep = columnsToKeep1.map((element) => element.trim())

 
     // Filter and create a new worksheet with only the specified columns
    //  const filteredWorksheet = XLSX.utils.sheet_to_json(worksheet, {
    //   header: 1, // Assuming the first row contains headers
    //   raw: false,
    //   range: 0, // Range of rows to process (0 means all rows)
    //   blankrows: false, // Include blank rows
    // }).map((row:any) => row.filter((_ :any, index:any) => columnsToKeep.includes(worksheet[XLSX.utils.encode_cell({ r: 0, c: index })].v)));
  
    const filteredWorksheet = XLSX.utils.sheet_to_json(worksheet, {
      header: 1, // Assuming the first row contains headers
      raw: false,
      range: 0, // Range of rows to process (0 means all rows)
      blankrows: false, // Exclude blank rows
    }).map((row: any) => {
      // Process each element of the row
      const processedRow = row.map((cell: any) => {
        // Replace empty or null cells with 'NA'
        return cell === null || cell === '' ? 'NA' : cell;
      });
    
      // Filter columns based on columnsToKeep array
      return processedRow.filter((_:any, index: any) => columnsToKeep.includes(worksheet[XLSX.utils.encode_cell({ r: 0, c: index })].v));
    });


    
     // Create a new workbook with the filtered worksheet
     const newWorkbook = XLSX.utils.book_new();
     const newWorksheet = XLSX.utils.aoa_to_sheet(filteredWorksheet);
     XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'FilteredSheet');
 
     // Convert the new workbook to a blob
     const arrayBuffer = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'array' });

     // Create a Blob from the ArrayBuffer
     const blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
 
     const obj = {
      SelectedType: '10',
      HierarchyName: this.HierarchyName,
    };
     // Send the blob to the API
     const formData = new FormData();
     formData.append('file'+0, blob, 'filtered_file.xlsx');
     formData.append('model', JSON.stringify(obj));
debugger
    this.isUploading = true;
    this.hierarchyService
      .uploadTreeHierarchy(formData)
      .subscribe((data) => {
        debugger
        if (data) {
          debugger 
          alert('file Submited');
          this.router.navigate(["/hierarchy"])
          if (data && data.errorMessage) {
          }
          this.isUploading = true;
        }
      });
    // } else {
    //   this.fileError = false;
    // }
   };
   reader.readAsBinaryString(this.selectedFile);
  }
}
