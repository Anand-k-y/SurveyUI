import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HierarchyServiceService } from '../Services/hierarchy-service.service';
import { AddNodeDialogComponent } from '../add-node-dialog/add-node-dialog.component';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
interface TreeNode {
  Id: number;
  NodeName: string;
  NodeType: string;
  NodeNumber: string;
  IsOnParentDevice: boolean;
  children?: TreeNode[];
  expanded?: boolean;
  HierarchyId:number
  ParentId:number
}
@Component({
  selector: 'app-tree-hierarchy-view',
  templateUrl: './tree-hierarchy-view.component.html',
  styleUrls: ['./tree-hierarchy-view.component.css'],
})
export class TreeHierarchyViewComponent implements OnInit {
  rowData: any[] = [];

  expandedStates: { [key: number]: boolean } = {};

  msg: any = {};
  gridApi: any;
   gridColumnApi: any;
   HierarchyName!: string;

  hierarchyData: any[] = [];
  hierarchyData1: any[] = [];
  displayedColumns: string[] = ['HType', 'NodeName', 'action'];
  columnFieldNames: string[] = [];

  actionCellTemplate = `
  <div class="ui-grid-cell-contents" style="background: white;">
    <div class="btn-group btn-group-xs" role="group" aria-label="...">
      <button type="button" ng-if="row.entity.NodeType.toLowerCase().trim()!='meter'"
         title="Add new hierarchy node" class="btn btn-default"
         ng-click="grid.appScope.addRow(row)"><span style="color:green" class="glyphicon glyphicon-plus"> <u>{{row.entity.NodeType.toLowerCase().trim() == 'dt' ? 'Add Meter': 'Add Node'}}</u></span></button>

      <button type="button" title="Delete node" class="btn btn-default" ng-click="grid.appScope.deleteRow(row)"><span style="color:red" class="glyphicon glyphicon-trash"> <u>Delete</u></span></button>
      <button type="button" title="Edit node" class="btn btn-default" ng-click="grid.appScope.editRow(row)"><span style="color:blue" class="glyphicon glyphicon-edit"> <u>Edit</u></span></button>
    </div>
  </div>
`;

  NodeTypes: any[] = []; // Initialize NodeTypes as an empty array
  isHierarchyEmpty: boolean = false; // Initialize isHierarchyEmpty property
  isLoading: boolean = true; // Initialize isLoading property

  // toggleIcon(row: any) {
  //   debugger;
  //   if (
  //     this.hierarchyData.filter((s) => s.HierarchyId > row.HierarchyId).length >
  //     0
  //   ) {

  //     if (!this.expandedStates[row.Id]) {
  //       this.hierarchyData1 = this.hierarchyData.filter(
  //         (s) => s.ParentId == row.Id || s.Id <= row.Id
  //       );
  //     } else {
  //       this.hierarchyData1 = this.hierarchyData.filter((s) => s.Id <= row.Id);
  //       if (row.ParentId == 0) {
  //         this.ngOnInit();
  //       }
  //     }
  //     this.expandedStates[row.Id] = !this.expandedStates[row.Id];
  //   }
  // }

  gridOptions: any = {
    enableSorting: true,
    enableFiltering: true,
    exporterMenuPdf: false,
    showTreeExpandNoChildren: true,
    columnDefs: [
      {
        name: 'toggle',
        displayName: '',
        enableSorting: false,
        width: '0%',
        enableCellEdit: false,
        cellTemplate: 'togglebutton',
      },
      {
        name: 'NodeType',
        displayName: 'Level',
        width: '20%',
        enableCellEdit: false,
        headerTooltip: 'Type of node (non-editable)',
        editable: false,
      },
      {
        name: 'NodeName',
        displayName: 'Name*',
        width: '20%',
        cellTooltip: 'Double click to edit',
        headerTooltip: 'Node Name (editable)',
        editable: true,
      },
      {
        name: 'NodeNumber',
        displayName: 'Code*',
        width: '15%',
        cellTooltip: 'Double click to edit',
        headerTooltip: 'Node Code (editable)',
        editable: true,
      },
      {
        name: 'IsOnParentDevice',
        displayName: 'Is On Parent?*',
        type: 'boolean',
        width: '15%',
        cellTooltip:
          'Indicates whether the device is installed on parent node? This will be true in case of Feeder meters,DT meters,etc. Double click to edit',
        headerTooltip: 'IsOnParentNode (editable)',
        editable: true,
      },
      {
        name: 'action',
        displayName: 'Action',
        enableSorting: false,
        enableCellEdit: false,
        cellTemplate: this.actionCellTemplate,
        width: '20%',
        cellTooltip: 'Delete',
        headerTooltip: 'Action',
      },
    ],
    rowData: [],
    enableGridMenu: true,
    enableSelectAll: true,
    exporterExcelFilename: 'myFile.xlsx',
    exporterExcelSheetName: 'Sheet1',
    onRegisterApi: (gridApi: any) => {
      this.gridApi = gridApi;
      gridApi.edit.on.afterCellEdit(
        null,
        (rowEntity: any, colDef: any, newValue: any, oldValue: any) => {
          this.msg.lastCellEdited = `Edited row id: ${rowEntity.id} Column: ${colDef.field} newValue: ${newValue} oldValue: ${oldValue}`;
          rowEntity.name = rowEntity.name.toUpperCase().trim();
          // this.gridOptions.api?.setRowData([...this.gridOptions.data]);
          this.gridApi?.setRowData([...this.gridOptions.rowData]);
        }
      );
    },
  };
  rowEditor: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private hierarchyService: HierarchyServiceService
  ) {
    this.hierarchyData1.forEach((item) => {
      this.expandedStates[item.Id] = true; // Assuming 'Id' is a unique identifier
    });
  }

  ngOnInit(): void {
    this.columnFieldNames = this.gridOptions.columnDefs.map((c: any) => c.name);

    this.route.params.subscribe((params) => {
      const selectedHierarchyName =
        this.hierarchyService.getSelectedHierarchyName();
      if (selectedHierarchyName !== undefined) {
        this.HierarchyName = selectedHierarchyName;
      }
      this.loadHierarchy();
    });
  }

  editRow(row: any): void {
    debugger;
    const dialogRef: MatDialogRef<AddNodeDialogComponent> = this.dialog.open(
      AddNodeDialogComponent,
      {
        width: '400px', // Adjust the width as needed
        data: {
          row: row, // Pass the row data to the dialog
          // nodeTypes: this.NodeTypes, // Pass any other necessary data
          HierarchyName: this.HierarchyName,
          NodeName: row.NodeName,
          NodeType: row.NodeType,
          type:true,
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.hierarchyService.EditHierarchyNode(result.newRowData).subscribe(
          (response) => {
            console.log('Node edited successfully:', response);
          },
          (error) => {
            console.error('Error editing node:', error);
          }
        );

        this.gridOptions.api?.setRowData([...this.gridOptions.data]);
      }
    });
  }
  addRow(row: any): void {
    debugger;
    const dialogRef: MatDialogRef<AddNodeDialogComponent> = this.dialog.open(
      AddNodeDialogComponent,
      {
        width: '400px', // Adjust the width as needed
        data: {
          row: row, // Pass the row data to the dialog
          // nodeTypes: this.NodeTypes, // Pass any other necessary data
          HierarchyName: this.HierarchyName,
          NodeName: row.NodeName,
          // NodeType: row.NodeTypes,
          // HierarchyId:row.HierarchyId,
          // ParentId:row.ParentId,
          type:false,

        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        debugger;

        this.hierarchyService.AddHierarchyNode(result.newRowData,result.HierarchyName).subscribe(
          (response) => {
            debugger;
            // Handle the success response if needed
            console.log('Node Added successfully:', response);
          },
          (error) => {
            // Handle any error that occurs during the API call
            console.error('Error adding node:', error);
          }
        );

        // Refresh the grid data (if needed)
        this.gridOptions.api?.setRowData([...this.gridOptions.data]);
      }
    });
  }

  deleteRow(row: any): void {
    Swal.fire({
      title: `Deleting ${row.NodeName} : Are you sure?`,
      text: 'You will not be able to undo this action! We will notify you once done!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const objToDelete = {
          HierarchyName: this.HierarchyName,
          RowId: row.Id,
        };

        const nodeNameToBeDeleted = row.NodeName;

        this.hierarchyService
          .DeleteHierarchyNode(objToDelete)
          .subscribe((data) => {
            Swal.fire(
              'Deleted!',
              `${nodeNameToBeDeleted} has been removed successfully.`,
              'success'
            );

            // Assuming that 'row' is part of your local data structure,
            // you can remove it from the array
            const index = this.gridOptions.rowData.indexOf(row);
            if (index !== -1) {
              this.gridOptions.rowData.splice(index, 1);
              this.gridOptions.api?.setRowData([...this.gridOptions.rowData]);
            }
          });
      }
    });
  }
  treeControl: NestedTreeControl<TreeNode> = new NestedTreeControl<TreeNode>(
    (node) => node.children
  );

  hasChild = (_: number, node: TreeNode) =>
    !!node.children && node.children.length > 0;
  dataSource: MatTableDataSource<TreeNode> = new MatTableDataSource<TreeNode>(
    []
  );

  loadHierarchy(): void {
    debugger;
    this.isLoading = true;
    this.hierarchyService
      .getTreeHierarchyByName(this.HierarchyName)
      .subscribe((data: any[]) => {
        debugger;
        this.NodeTypes = [];
        if (data.length === 0) {
          this.isHierarchyEmpty = true;
        }
        this.isLoading = false;

        const hierarchyMap: Record<number, TreeNode> = {};
        const rootNodes: TreeNode[] = [];

        for (const item of data) {
          const treeNode: TreeNode = {
            Id: item.Id,
            NodeName: item.NodeName,
            NodeNumber: item.NodeNumber,
            NodeType: item.NodeType,
            IsOnParentDevice: item.IsOnParentDevice,
            children: [],
            HierarchyId:item.Id,
            ParentId:item.ParentId
          };

          hierarchyMap[item.Id] = treeNode;

          if (item.ParentId === 0) {
            rootNodes.push(treeNode);
            this.expandedStates[item.Id] = false; // Initialize expanded state to false
          }
        }

        for (const item of data) {
          if (item.ParentId !== null) {
            const parent = hierarchyMap[item.ParentId];
            if (parent) {
              if (!parent.children) {
                parent.children = [];
              }
              parent.children.push(hierarchyMap[item.Id]);
            }
          }
        }

        // Set up the hierarchical data source
        this.dataSource.data = rootNodes;
        this.hierarchyData = data;
      });
  }

  toggleNode(node: TreeNode): void {
    debugger;
    node.expanded = !node.expanded;
    this.expandedStates[node.Id] = !this.expandedStates[node.Id];
  }

  refresh(): void {
    this.loadHierarchy();
    this.expandedStates = {};
  }
}
