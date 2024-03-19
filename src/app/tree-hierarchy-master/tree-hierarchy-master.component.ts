import { Component, OnInit } from '@angular/core';
import { HierarchyServiceService } from '../Services/hierarchy-service.service';
import { HttpClient } from '@angular/common/http';
import { compareValues } from '../utils';

import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tree-hierarchy-master',
  templateUrl: './tree-hierarchy-master.component.html',
  styleUrls: ['./tree-hierarchy-master.component.css'],
})
export class TreeHierarchyMasterComponent implements OnInit {
  columnFieldNames: string[] = [];
  msg: any = {};
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  gridApi: any;
  gridColumnApi: any;
  formSubmitted: boolean = false;
  disableSubmitButton: boolean = false;

  gridOptions: any = {
    rowHeight: 33,
    columnDefs: [
      {
        name: 'name',
        displayName: 'Node Name (editable)',
        enableSorting: false,
        width: '30%',
        cellTooltip: 'Double click to edit',
        headerTooltip: 'Node Name (editable)',
        editable: true,
      },
      {
        name: 'order',
        displayName: 'Order (editable)',
        enableSorting: false,
        type: 'number',
        width: '30%',
        cellTooltip: 'Double click to edit',
        headerTooltip: 'Node Order (editable)',
        editable: true,
      },
      {
        name: 'type',
        displayName: 'Node Type (editable)',
        enableSorting: false,
        editableCellTemplate: 'ui-grid/dropdownEditor',
        cellTooltip: 'Double click to edit',
        headerTooltip: 'Node Type (editable)',
        width: '30%',
        cellFilter: 'mapType',
        editDropdownValueLabel: 'type',
        editDropdownOptionsArray: [
          { id: '', type: '' },
          { id: 'FEEDER', type: 'FEEDER' },
          { id: 'DT', type: 'DT' },
          { id: 'GATEWAY', type: 'GATEWAY' },
          { id: 'METER', type: 'METER' },
        ],
        editable: true,
      },
      {
        name: 'action',
        displayName: 'Action',
        enableSorting: false,
        enableCellEdit: false,
        cellTemplate: 'deleteCellTemplate', // You should define deleteCellTemplate
      },
    ],
    rowData: [],

    onRegisterApi: (gridApi: any) => {
     
    },
  };
  hierarchyName: string = '';

  constructor(
    private hierarchyService: HierarchyServiceService,
    private http: HttpClient,
    private route: Router
  ) {}

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  ngOnInit() {

    this.columnFieldNames = this.gridOptions.columnDefs.map((c: any) => c.name);
    this.dataSource = new MatTableDataSource<any>(this.gridOptions.rowData);

  }

  addNewLevel() {
    var newLevel = {
      order: this.gridOptions.rowData.length + 1,
      name: 'NEW LEVEL',
      type: '',
    };
    this.gridOptions.rowData.push(newLevel);

    // Refresh the grid to display the new row
    this.gridApi?.setRowData(this.gridOptions.rowData);
    this.ngOnInit();
    // this.cdr.detectChanges();
  }
  onCellBlur(element: any): void {
    element.editing = false;
    // Handle cell blur event (e.g., update backend, save changes, etc.)
    // You can implement the necessary logic here
  }
  onCellDoubleClick(element: any, column: any): void {
    console.log('Double-clicked:', element, column);
    if (column.editable) {
      element.editing = true; // Add an "editing" property to the element to track edit mode
    }
  }
  deleteRow(row: any) {
    const index = this.gridOptions.rowData.indexOf(row);
    console.log(index);

    if (index !== -1) {
      this.gridOptions.rowData.splice(index, 1);
      this.gridOptions.api?.setRowData([...this.gridOptions.rowData]);
      this.ngOnInit();
    }
  }
  submitForm(form: any): void {
    debugger;
    this.formSubmitted = true;
    // this.gridOptions.rowData.sort(compareValues('order'));
    // if (form.valid) {
    const obj = {
      HierarchyName: this.hierarchyName,
      HierarchyMaster: this.gridOptions.rowData,
    };
    // this.disableSubmitButton = true;

    this.hierarchyService.AddHierarchyMaster(obj).subscribe((result) => {
      if (result == 1) {
        this.route.navigate(['/hierarchy']);
      }
    });
    //}
  }
}
