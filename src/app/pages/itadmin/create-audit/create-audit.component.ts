import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from '../../../core/Constant/apiConstant';
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
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';

const URL = BASE_URL;
const headers = new HttpHeaders();

@Component({
  selector: 'app-create-audit',
  standalone: true,
  imports: [CommonModule, GridModule, FormsModule, DropDownListModule, MultiColumnComboBoxModule],
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
  templateUrl: './create-audit.component.html',
  styleUrls: ['./create-audit.component.css']
})
export class CreateAuditComponent implements OnInit {
  @ViewChild('grid') public grid!: GridComponent;
  public audits: any[] = [];

  public editSettings: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    mode: 'Dialog',
    showDeleteConfirmDialog: true
  };

  public locationData: any[] = [];
  public activeLocationData: any[] = [];
  public locationFields: Object = { text: 'location', value: 'locationID' };
  public selectedGridLocation: any = null;
  public isAddMode = false;

  public pageSettings: PageSettingsModel = { pageSize: 10, pageSizes: true };
  public toolbar: string[] = ['Add', 'Search', 'ExcelExport', 'PdfExport', 'ColumnChooser'];
  public filterSettings: FilterSettingsModel = { type: 'Excel' };
  public groupSettings: any = { showGroupedColumn: true };

  public commands: CommandModel[] = [
    { type: 'Edit', buttonOption: { iconCss: 'e-icons e-edit', cssClass: 'e-flat' } },
    { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
    { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
    { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }
  ];

  public namerules = { required: true };
  public coderules = { required: true };

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.GetLocations();
    this.GetAudits();
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  getLocationName(locationId: any): string {
    if (locationId === null || locationId === undefined || locationId === '') {
      return '';
    }
    const loc = this.locationData.find(x => x.locationID === Number(locationId));
    return loc ? loc.location : locationId.toString();
  }

  onGridLocationChange(event: any): void {
    console.log('Location change event:', event);

    if (event?.itemData?.locationID !== undefined) {
      this.selectedGridLocation = event.itemData.locationID;
    } else if (event?.value !== undefined && event.value !== null) {
      this.selectedGridLocation = event.value;
    } else {
      this.selectedGridLocation = null;
    }

    console.log('selectedGridLocation set to:', this.selectedGridLocation);
  }

  // ─── API Calls ────────────────────────────────────────────────────────────────

  GetLocations(): void {
    this.http.get<any[]>(URL + '/LocationDetails', { headers })
      .subscribe({
        next: (res) => {
          this.locationData = res || [];
          this.activeLocationData = (res || []).filter(item =>
            item &&
            item.status &&
            item.status.trim().toLowerCase() === 'active' &&
            item.location &&
            item.location.trim() !== ''
          );
        },
        error: (err) => {
          console.error('Error fetching locations:', err);
        }
      });
  }

  GetAudits(): void {
    this.http.get<any[]>(URL + '/AuditDetails', { headers })
      .subscribe({
        next: (res) => {
          this.audits = res || [];
          if (this.grid) {
            this.grid.refresh();
          }
        },
        error: (err) => {
          console.error('Error fetching audits:', err);
        }
      });
  }

  private buildInsertPayload(data: any): any {
    return {
      auditID: 0,
      auditName: data.auditName,
      auditDescription: data.auditDescription || '',
      locationID: data.locationID,
      status: 'Started',
      auditStatus: 'Active',
      auditDate: null,
      auditBy: '',
      unitNo: '',
      totalStock: 0,
      custodianDepartment: '',
      custDepartmentCode: '',
      custDesignation: '',
      custodianName: '',
      completionDate: null,
      adminRemarks: ''
    };
  }

  saveAudit(data: any): void {
    const body = this.buildInsertPayload(data);
    this.http.post(URL + '/InsertAudit', body, { headers })
      .subscribe({
        next: (res) => {
          console.log('Insert response:', res);
          alert('Inserted Successfully');
          this.GetAudits();
        },
        error: (err) => {
          console.error('Insert error:', err);
          alert('Insert Failed');
        }
      });
  }

  updateAudit(data: any): void {
    this.http.put(URL + '/UpdateAudit', data, { headers, responseType: 'text' })
      .subscribe({
        next: (res) => {
          console.log('Update response:', res);
          alert('Updated Successfully');
          this.GetAudits();
        },
        error: (err) => {
          console.error('Update error:', err);
          alert('Update Failed');
        }
      });
  }

  deleteAudit(auditID: number): void {

    console.log('Deleting AuditID:', auditID);

    this.http.delete(
      URL + '/DeleteAudit/' + auditID,
      {
        headers,
        responseType: 'text'
      }
    )
      .subscribe({
        next: (res) => {

          console.log('Delete response:', res);

          alert('Deleted Successfully');

          this.GetAudits();
        },

        error: (err) => {

          console.error('Delete error:', err);

          alert('Delete Failed');
        }
      });
  }

  // ─── Grid Events ──────────────────────────────────────────────────────────────

  actionBegin(args: any): void {
    if (args.requestType === 'add') {
      this.isAddMode = true;
      this.selectedGridLocation = null;
      if (args.rowData) {
        args.rowData.locationID = null;
        args.rowData.status = 'Started';
        args.rowData.auditStatus = 'Active';
        args.rowData.auditName = '';
        args.rowData.auditDescription = '';
      }

    } else if (args.requestType === 'beginEdit') {
      this.isAddMode = false;
      if (args.rowData) {
        this.selectedGridLocation = args.rowData.locationID ?? null;
      }

    } else if (args.requestType === 'save') {
      if (args.action === 'add' && args.data) {
        args.data.status = 'Started';
        args.data.auditStatus = 'Active';
      }

      if (args.data) {
        const locationID = this.selectedGridLocation ?? args.data.locationID ?? null;

        if (!locationID) {
          alert('Location is required');
          args.cancel = true;
          return;
        }

        args.data.locationID = Number(locationID);
        this.selectedGridLocation = Number(locationID);
      }
    } else if (args.requestType === 'cancel') {
      this.isAddMode = false;
    }
  }

  actionComplete(args: any): void {
    if (args.requestType === 'save') {
      const locationID = this.selectedGridLocation ?? args.data.locationID ?? null;

      const payload: any = {
        auditID: args.data.auditID || 0,
        auditName: args.data.auditName,
        auditDescription: args.data.auditDescription || '',
        locationID: Number(locationID)
      };

      if (args.action === 'add') {
        this.saveAudit(payload);
        this.isAddMode = false;
      } else if (args.action === 'edit') {
        this.updateAudit({
          ...payload,
          status: args.data.status || 'Started',
          auditStatus: args.data.auditStatus || 'Active'
        });
      }

    } else if (args.requestType === 'delete') {
      console.log('Delete args:', args);
      const deleted = Array.isArray(args.data) ? args.data[0] : args.data;
      const auditID = deleted?.auditID ?? deleted?.AuditID ?? null;

      if (auditID) {
        this.deleteAudit(auditID);
      } else {
        console.error('Delete failed:', deleted);
        alert('Audit ID not found');
      }
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