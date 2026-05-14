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
  selector: 'app-view-departments',
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
  templateUrl: './view-departments.component.html',
  styleUrls: ['./view-departments.component.css']
})
export class ViewDepartmentsComponent implements OnInit {
  @ViewChild('grid') public grid!: GridComponent;
  
  public departments: any[] = [];
  private apiUrl = BASE_URL;
  private headers = new HttpHeaders();

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

  public namerules = { required: true };
  public coderules = { required: true };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments() {
    this.http.get<any[]>(`${this.apiUrl}/DepartmentDetails`, { headers: this.headers })
      .subscribe({
        next: (res) => {
          this.departments = res;
        },
        error: (err) => {
          console.error('Error fetching departments:', err);
        }
      });
  }

  actionComplete(args: any): void {
    if (args.requestType === 'save') {
      if (args.action === 'add') {
        this.insertDepartment(args.data);
      } else if (args.action === 'edit') {
        this.updateDepartment(args.data);
      }
    } else if (args.requestType === 'delete') {
      this.deleteDepartment(args.data[0]);
    }
  }

  insertDepartment(data: any) {
    this.http.post(`${this.apiUrl}/InsertDepartment`, data, { headers: this.headers })
      .subscribe({
        next: (res) => {
          alert('Department Inserted Successfully');
          this.getDepartments();
        },
        error: (err) => {
          console.error('Insert Failed:', err);
          alert('Insert Failed');
        }
      });
  }

  updateDepartment(data: any) {
    this.http.put(`${this.apiUrl}/UpdateDepartment/${data.DepartmentCode}`, data, { headers: this.headers })
      .subscribe({
        next: (res) => {
          alert('Updated Successfully');
          this.getDepartments();
        },
        error: (err) => {
          console.error('Update Failed:', err);
          alert('Update Failed');
        }
      });
  }

  deleteDepartment(data: any) {
    this.http.delete(`${this.apiUrl}/DeleteDepartment/${data.DepartmentCode}`, { headers: this.headers })
      .subscribe({
        next: (res) => {
          alert('Deleted Successfully');
          this.getDepartments();
        },
        error: (err) => {
          console.error('Delete Failed:', err);
          alert('Delete Failed');
        }
      });
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
