import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-node-dialog',
  templateUrl: './add-node-dialog.component.html',
  styleUrls: ['./add-node-dialog.component.css']
})
export class AddNodeDialogComponent {
  nodeType: string = ''; // The selected node type
  nodeTypes: string[] = ['State', 'City', 'Company', 'Meter'];
  newRowData: any = {}; // Store the new row data
  editData: any = {};
  nodeName: string = ''; 
  type:boolean ;
  // nodetype:string = ''; 
  HierarchyId:string='';
  @Input() input: any;
  HierarchyName: any;
  parentId: any;
  constructor(
    public dialogRef: MatDialogRef<AddNodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    debugger
    this.newRowData = { ...data.row }; // Create a copy of the row data
    // this.nodeType = this.newRowData.NodeType;
    this.nodeName = data.NodeName;
    this.nodeType = data.NodeType;
    this.HierarchyName=data.HierarchyName;
    this.type=data.type;
    // this.HierarchyId=data.HierarchyId;
    // this.parentId=data.ParentId;
   }

  onSaveClick(): void {
    debugger
    // console.log(thi);
    
    // Perform save logic here
    // this.newRowData.NodeType=this.nodeType
    this.dialogRef.close({
      editData: this.editData,
      HierarchyName: this.HierarchyName,
      // HierarchyId : this.HierarchyId, // Edited data
      newRowData: this.newRowData,
      // parentId:this.parentId,
      // New row data
    }
    );
  }

  onCancelClick(): void {
    debugger
    this.dialogRef.close();
  }
}
