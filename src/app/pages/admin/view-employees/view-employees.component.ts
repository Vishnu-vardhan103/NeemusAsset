import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from '../../../core/Constant/apiConstant';
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
  selector: 'app-view-employees',
  standalone: true,
  imports: [CommonModule, GridModule, ButtonModule],
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
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent implements OnInit {
  @ViewChild('grid') public grid!: GridComponent;
  
  public employees: any[] = [
    { id: '150320', name: 'Ashok Kumar Sharma', designation: 'Process Operator', reporting: '100444', email: 'ashok.sharma@nrl.co.in', status: 'Active' },
    { id: '100415', name: 'Gaurab Das', designation: 'SM(HR)', reporting: '100136', email: 'gaurab.das@nrl.co.in', status: 'Active' },
    { id: '150395', name: 'Gauri Duarah', designation: 'Technician', reporting: '100402', email: 'gauri.duarah@nrl.co.in', status: 'Inactive' },
    { id: '150303', name: 'Bhupen Chetia', designation: 'Process Operator', reporting: '100322', email: 'bhupen.chetia@nrl.co.in', status: 'Active' },
    { id: '100676', name: 'Ashok Kumar Boruah', designation: 'CM(PROJECT)', reporting: '100103', email: 'ashok.boruah@nrl.co.in', status: 'Active' },
    { id: '100358', name: 'Krishna Kt Dutta', designation: 'CM(OPNS)', reporting: '100235', email: 'krishna.dutta@nrl.co.in', status: 'Active' },
    { id: '150313', name: 'Dinesh Das', designation: 'Process Operator', reporting: '100502', email: 'dinesh.das@nrl.co.in', status: 'Inactive' },
    { id: '150316', name: 'Devajit Dev Sarmah', designation: 'Process Operator', reporting: '100328', email: 'devajit.sarmah@nrl.co.in', status: 'Active' },
    { id: '150317', name: 'Deepak Kumar Boro', designation: 'Process Operator', reporting: '100168', email: 'deepak.boro@nrl.co.in', status: 'Active' },
    { id: '100528', name: 'Tonmoy Phukan', designation: 'MGR(F&S)', reporting: '100389', email: 'tonmoy.phukan@nrl.co.in', status: 'Active' }
  ];

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

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
