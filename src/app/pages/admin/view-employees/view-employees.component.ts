import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
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
  ReorderService,
  SearchService
} from '@syncfusion/ej2-angular-grids';
const URL = BASE_URL;
const headers = new HttpHeaders();
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
    ReorderService,
    SearchService
  ],
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent implements OnInit {
  @ViewChild('grid') public grid!: GridComponent;
  
  public employees: any[] = [];
  private apiUrl = BASE_URL;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

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

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
     this.http.get<any[]>(URL + '/CustodianDetails', { headers })
      .subscribe({
        next: (res) => {
          this.employees = res;
            if (this.grid) {
          this.grid.refresh();
        }
        },
        error: (err) => {
          console.error('Error fetching locations:', err);
        }
      });
    // this.http.get<any>(`${this.apiUrl}/CustodianDetails`, { headers: this.headers })
    //   .subscribe({
    //     next: (res) => {
    //       console.log('Employees API Response:', res);
    //       let data = [];
    //       if (Array.isArray(res)) {
    //         data = res;
    //       } else if (res && Array.isArray(res.result)) {
    //         data = res.result;
    //       } else if (res && Array.isArray(res.data)) {
    //         data = res.data;
    //       } else if (res && res.$values && Array.isArray(res.$values)) {
    //         data = res.$values;
    //       }

    //       this.employees = data.map((item: any) => ({
    //         ...item,
    //         CustodianID: item.CustodianID || item.custodianID || item.id || item.CustodianId,
    //         CustodianName: item.CustodianName || item.custodianName || item.name || item.FullName,
    //         CustodianDepartmentCode: item.CustodianDepartmentCode || item.departmentCode || item.DepartmentCode || item.deptCode,
    //         Designation: item.Designation || item.designation,
    //         ReportingStaffNo: item.ReportingStaffNo || item.reportingStaffNo,
    //         Email: item.Email || item.email,
    //         CustodianStatus: item.CustodianStatus || item.custodianStatus || item.status || 'Active'
    //       }));
    //       this.cdr.detectChanges();
    //     },
    //     error: (err) => {
    //       console.error('Error fetching employees:', err);
    //     }
    //   });
  }

  actionComplete(args: any): void {
    if (args.requestType === 'save') {
      if (args.action === 'add') {
        this.insertEmployee(args.data);
      } else if (args.action === 'edit') {
        this.updateEmployee(args.data);
      }
    } else if (args.requestType === 'delete') {
      this.deleteEmployee(args.data[0]);
    }
  }

  insertEmployee(data: any) {
    this.http.post(`${this.apiUrl}/InsertCustodian`, data, { headers: this.headers })
      .subscribe({
        next: (res) => {
          alert('Employee Inserted Successfully');
          this.getEmployees();
        },
        error: (err) => {
          console.error('Insert Failed:', err);
          alert('Insert Failed');
        }
      });
  }

  updateEmployee(data: any) {
    this.http.put(`${this.apiUrl}/UpdateCustodian/${data.CustodianID}`, data, { headers: this.headers })
      .subscribe({
        next: (res) => {
          alert('Updated Successfully');
          this.getEmployees();
        },
        error: (err) => {
          console.error('Update Failed:', err);
          alert('Update Failed');
        }
      });
  }

  deleteEmployee(data: any) {
    this.http.delete(`${this.apiUrl}/DeleteCustodian/${data.CustodianID}`, { headers: this.headers })
      .subscribe({
        next: (res) => {
          alert('Deleted Successfully');
          this.getEmployees();
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

