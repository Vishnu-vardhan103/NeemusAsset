import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { 
  GridModule, 
  GridComponent,
  EditService, 
  ToolbarService, 
  CommandColumnService, 
  PageService, 
  SortService, 
  FilterService,
  EditSettingsModel,
  CommandModel,
  PageSettingsModel,
  FilterSettingsModel,
  ExcelExportService,
  PdfExportService,
  RowDDService,
  GroupService,
  ColumnChooserService,
  ResizeService,
  ReorderService
} from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-dept-custodian-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    GridModule,
    ButtonModule
  ],
  providers: [
    EditService,
    ToolbarService,
    CommandColumnService,
    PageService,
    SortService,
    FilterService,
    ExcelExportService,
    PdfExportService,
    RowDDService,
    GroupService,
    ColumnChooserService,
    ResizeService,
    ReorderService
  ],
  templateUrl: './dept-custodian-list.component.html',
  styleUrls: ['./dept-custodian-list.component.css']
})
export class DeptCustodianListComponent implements OnInit {
  @ViewChild('grid') public grid!: GridComponent;
  selectedDept: string = '';
  
  departments = [
    { value: 'HR', viewValue: 'Human Resources' },
    { value: 'FIN', viewValue: 'Finance' },
    { value: 'IT', viewValue: 'Information Technology' },
    { value: 'OPS', viewValue: 'Operations' }
  ];

  allCustodians = [
    { id: '150320', name: 'Ashok Kumar Sharma', dept: 'Operations', designation: 'Process Operator', status: 'Active' },
    { id: '100415', name: 'Gaurab Das', dept: 'Human Resources', designation: 'SM(HR)', status: 'Active' },
    { id: '150395', name: 'Gauri Duarah', dept: 'Information Technology', designation: 'Technician', status: 'Inactive' },
    { id: '150303', name: 'Bhupen Chetia', dept: 'Operations', designation: 'Process Operator', status: 'Active' },
    { id: '100676', name: 'Ashok Kumar Boruah', dept: 'Projects', designation: 'CM(PROJECT)', status: 'Active' },
    { id: '100358', name: 'Krishna Kt Dutta', dept: 'Operations', designation: 'CM(OPNS)', status: 'Active' }
  ];

  filteredData: any[] = [];

  public editSettings: EditSettingsModel = { 
    allowAdding: true,
    allowEditing: true, 
    allowDeleting: true, 
    mode: 'Dialog',
    showDeleteConfirmDialog: true
  };
  
  public pageSettings: PageSettingsModel = { pageSize: 10, pageSizes: true };
  public toolbar: string[] = ['Add', 'Search', 'ExcelExport', 'PdfExport', 'ColumnChooser'];
  public filterSettings: FilterSettingsModel = { type: 'Excel' };
  public groupSettings: any = { showGroupedColumn: true };
  
  public commands: CommandModel[] = [
    { type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
    { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
    { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
    { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }
  ];

  ngOnInit(): void {
    this.filteredData = this.allCustodians;
  }

  onSearch() {
    if (this.selectedDept) {
      const deptObj = this.departments.find(d => d.value === this.selectedDept);
      const deptName = deptObj ? deptObj.viewValue : '';
      this.filteredData = this.allCustodians.filter(c => c.dept === deptName);
    } else {
      this.filteredData = this.allCustodians;
    }
  }

  actionComplete(args: any): void {
    if (args.requestType === 'save') {
      if (args.action === 'add') {
        alert('Add action triggered');
      } else if (args.action === 'edit') {
        alert('Edit action triggered');
      }
    } else if (args.requestType === 'delete') {
      alert('Delete action triggered');
    }
  }

  addRecord() {
    if (this.grid) {
      this.grid.addRecord();
    }
  }

  toolbarClick(args: any): void {
    if (args.item.id.includes('excelexport')) {
      this.grid.excelExport();
    } else if (args.item.id.includes('pdfexport')) {
      this.grid.pdfExport();
    }
  }
}
