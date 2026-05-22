import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BASE_URL } from '../../../core/Constant/apiConstant';

import {
  GridModule,
  GridComponent,
  EditService,
  ToolbarService,
  PageService,
  SortService,
  FilterService,
  EditSettingsModel,
  PageSettingsModel,
  FilterSettingsModel,
  ExcelExportService,
  PdfExportService,
  GroupService,
  ColumnChooserService,
  ResizeService,
  ReorderService
} from '@syncfusion/ej2-angular-grids';

import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

const URL = BASE_URL;
const headers = new HttpHeaders();

@Component({
  selector: 'app-audit-completion',
  standalone: true,
  imports: [
    CommonModule,
    GridModule,
    FormsModule,
    DropDownListModule,
    DatePickerModule
  ],
  providers: [
    EditService,
    ToolbarService,
    PageService,
    SortService,
    FilterService,
    ExcelExportService,
    PdfExportService,
    GroupService,
    ColumnChooserService,
    ResizeService,
    ReorderService
  ],
  templateUrl: './audit-completion.component.html',
  styleUrls: ['./audit-completion.component.css']
})
export class AuditCompletionComponent implements OnInit {

  @ViewChild('grid') public grid!: GridComponent;

  // ─── Grid Data ────────────────────────────────────────────────────────────────
  public completions: any[] = [];
  public locationData: any[] = [];
  public activeAuditData: any[] = [];

  public auditFields: Object = { text: 'auditName', value: 'auditID' };

  // ─── Form fields — bound directly via [(ngModel)] in dialog template ──────────
  public formAuditID: number | null = null;
  public formAuditRecord: any = null;
  public formCompletionDate: Date | null = null;
  public formAdminRemarks: string = '';

  // ─── Grid Settings ────────────────────────────────────────────────────────────
  public pageSettings: PageSettingsModel     = { pageSize: 10, pageSizes: true };
  public filterSettings: FilterSettingsModel = { type: 'Excel' };
  public groupSettings: any  = { showGroupedColumn: true };
  public toolbar: string[]   = ['Add', 'Search', 'ExcelExport', 'PdfExport', 'ColumnChooser'];

  // ── No template property here — Syncfusion reads #editSettingsTemplate from HTML
  public editSettings: EditSettingsModel = {
    allowAdding:  true,
    allowEditing: false,
    allowDeleting: false,
    mode: 'Dialog',
    showDeleteConfirmDialog: false
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.GetLocations();
    this.GetAudits();
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────────

  getLocationName(locationId: any): string {
    if (locationId === null || locationId === undefined || locationId === '') return '';
    const loc = this.locationData.find(x => x.locationID === Number(locationId));
    return loc ? loc.location : locationId.toString();
  }

  onAuditChange(event: any): void {
    if (!event?.value) {
      this.formAuditRecord = null;
      this.formAuditID     = null;
      return;
    }
    this.formAuditID     = Number(event.value);
    this.formAuditRecord = this.activeAuditData.find(
      x => Number(x.auditID) === Number(event.value)
    ) || null;
    console.log('Selected audit record:', this.formAuditRecord);
  }

  // ─── API Calls ────────────────────────────────────────────────────────────────

  GetLocations(): void {
    this.http.get<any[]>(URL + '/LocationDetails', { headers }).subscribe({
      next: (res) => { this.locationData = res || []; },
      error: (err) => console.error('Error fetching locations:', err)
    });
  }

  GetAudits(): void {
    this.http.get<any[]>(URL + '/AuditDetails', { headers }).subscribe({
      next: (res) => {
        this.completions = res || [];
        this.activeAuditData = (res || []).filter(item => {
          const status = (item?.status ?? '').trim().toLowerCase();
          const auditStatus = (item?.auditStatus ?? '').trim().toLowerCase();
          return (status === 'started' || status === 'active') && auditStatus === 'active';
        });
        if (this.grid) this.grid.refresh();
      },
      error: (err) => console.error('Error fetching audits:', err)
    });
  }

  // ─── Grid Events ──────────────────────────────────────────────────────────────

  actionBegin(args: any): void {

    // Reset form every time dialog opens
    if (args.requestType === 'add') {
      this.formAuditID        = null;
      this.formAuditRecord    = null;
      this.formCompletionDate = null;
      this.formAdminRemarks   = '';
    }

    // Validate before Syncfusion closes the dialog
    if (args.requestType === 'save') {
      if (!this.formAuditID) {
        alert('Please select an Audit.');
        args.cancel = true;
        return;
      }
      if (!this.formCompletionDate) {
        alert('Please select a Completion Date.');
        args.cancel = true;
        return;
      }
    }
  }

  actionComplete(args: any): void {

    // Rename Save button to "Mark as Complete" once dialog is rendered
    if (args.requestType === 'add') {
      setTimeout(() => {
        const saveBtn = document.querySelector(
          '.e-dlg-container .e-primary'
        ) as HTMLElement;
        if (saveBtn) saveBtn.innerText = 'Mark as Complete';
      }, 100);
    }

    if (args.requestType === 'save') {

      if (!this.formAuditRecord) {
        alert('Selected audit record not found. Please re-select.');
        return;
      }

      // Build payload from component form fields — NOT args.data
      const payload = {
        auditID:             this.formAuditRecord.auditID,
        auditName:           this.formAuditRecord.auditName,
        auditDescription:    this.formAuditRecord.auditDescription  || '',
        locationID:          this.formAuditRecord.locationID,
        auditDate:           this.formAuditRecord.auditDate          || null,
        auditBy:             this.formAuditRecord.auditBy            || '',
        unitNo:              this.formAuditRecord.unitNo             || '',
        totalStock:          this.formAuditRecord.totalStock         || 0,
        custodianDepartment: this.formAuditRecord.custodianDepartment || '',
        custDepartmentCode:  this.formAuditRecord.custDepartmentCode  || '',
        custDesignation:     this.formAuditRecord.custDesignation     || '',
        custodianName:       this.formAuditRecord.custodianName       || '',
        completionDate:      this.formCompletionDate,
        adminRemarks:        this.formAdminRemarks || '',
        status:              'Completed',
        auditStatus:         'Inactive'   // lifecycle: completed + inactive
      };

      console.log('Payload being sent:', payload);

      this.http.put(URL + '/UpdateAudit', payload, { headers, responseType: 'text' })
        .subscribe({
          next: () => {
            alert('Audit Completed Successfully');
            this.GetAudits();
          },
          error: (err) => {
            console.error('Update error:', err);
            alert('Update Failed');
          }
        });
    }
  }

  toolbarClick(args: any): void {
    if (args.item.id.includes('excelexport')) this.grid.excelExport();
    else if (args.item.id.includes('pdfexport')) this.grid.pdfExport();
  }
}