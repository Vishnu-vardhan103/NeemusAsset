import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { BASE_URL } from '../../../core/Constant/apiConstant';
import {
  GridModule,
  GridComponent,
  ToolbarService,
  PageService,
  SortService,
  FilterService,
  PageSettingsModel,
  FilterSettingsModel,
  ExcelExportService,
  PdfExportService,
  GroupService,
  ColumnChooserService,
  ResizeService,
  ReorderService
} from '@syncfusion/ej2-angular-grids';

const URL = BASE_URL;
const headers = new HttpHeaders();

@Component({
  selector: 'app-audit-list',
  standalone: true,
  imports: [CommonModule, FormsModule, GridModule],
  providers: [
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
  templateUrl: './audit-list.component.html',
  styleUrls: ['./audit-list.component.css']
})
export class AuditListComponent implements OnInit {
  @ViewChild('grid') public grid!: GridComponent;

  filterType: string = 'All';
  isLoading: boolean = false;

  public locationData: any[] = [];
  public rawData: any[] = [];
  public auditData: any[] = [];

  public pageSettings: PageSettingsModel = { pageSize: 10, pageSizes: true };
  public toolbar: string[] = ['Search', 'ExcelExport', 'PdfExport', 'ColumnChooser'];
  public filterSettings: FilterSettingsModel = { type: 'Excel' };
  public groupSettings: any = { showGroupedColumn: true };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;

    forkJoin({
      audits: this.http.get<any[]>(URL + '/AuditDetails', { headers }),
      locations: this.http.get<any[]>(URL + '/LocationDetails', { headers })
    }).subscribe({
      next: ({ audits, locations }) => {
        this.locationData = locations || [];
        this.rawData = this.mapAudits(audits || []);
        this.isLoading = false;
        setTimeout(() => this.applyFilter(), 0);
      },
      error: (err) => {
        console.error('Error loading audit list:', err);
        this.isLoading = false;
      }
    });
  }

  private mapAudits(audits: any[]): any[] {
    return audits.map(a => {
      const loc = this.locationData.find(x => x.locationID === Number(a.locationID));
      return {
        ...a,
        createdBy: (a.auditBy ?? a.createdBy ?? '').toString().trim(),
        location: (loc?.location ?? a.location ?? '').trim(),
        locationCode: (loc?.locationCode ?? a.locationCode ?? '').trim(),
        auditDateDisplay: this.formatDate(a.auditDate)
      };
    });
  }

  formatDate(value: any): string {
    if (!value) return '';
    const d = new Date(value);
    if (isNaN(d.getTime())) return value.toString();
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  private norm(value: any): string {
    return (value ?? '').toString().trim().toLowerCase();
  }

  canComplete(audit: any): boolean {
    const status = this.norm(audit.status);
    const auditStatus = this.norm(audit.auditStatus);
    return (status === 'started' || status === 'active') && auditStatus === 'active';
  }

  completeAudit(audit: any): void {
    if (!this.canComplete(audit)) {
      return;
    }
    if (!confirm(`Mark audit "${audit.auditName}" as completed?`)) {
      return;
    }

    const payload = {
      auditID: audit.auditID,
      auditName: audit.auditName,
      auditDescription: audit.auditDescription || '',
      locationID: audit.locationID,
      auditDate: audit.auditDate || null,
      auditBy: audit.auditBy || '',
      unitNo: audit.unitNo || '',
      totalStock: audit.totalStock || 0,
      custodianDepartment: audit.custodianDepartment || '',
      custDepartmentCode: audit.custDepartmentCode || '',
      custDesignation: audit.custDesignation || '',
      custodianName: audit.custodianName || '',
      completionDate: new Date().toISOString(),
      adminRemarks: audit.adminRemarks || '',
      status: 'Completed',
      auditStatus: 'Inactive'
    };

    this.http.put(URL + '/UpdateAudit', payload, { headers, responseType: 'text' }).subscribe({
      next: () => {
        alert('Audit completed successfully');
        this.loadData();
      },
      error: (err) => {
        console.error('Complete audit error:', err);
        alert('Failed to complete audit');
      }
    });
  }

  onFilterChange(): void {
    this.applyFilter();
  }

  applyFilter(): void {
    if (
      this.filterType !== 'LocationWise' &&
      this.grid?.groupSettings?.columns?.length
    ) {
      this.grid.clearGrouping();
    }

    switch (this.filterType) {
      case 'All':
        this.auditData = [...this.rawData];
        break;

      case 'Current':
        this.auditData = this.rawData.filter(a => this.canComplete(a));
        break;

      case 'Pending':
        this.auditData = this.rawData.filter(a => this.norm(a.auditStatus) === 'pending');
        break;

      case 'Completed':
        this.auditData = this.rawData.filter(a => {
          const status = this.norm(a.status);
          const auditStatus = this.norm(a.auditStatus);
          return status === 'completed' && auditStatus === 'inactive';
        });
        break;

      case 'Approved':
        this.auditData = this.rawData.filter(a => this.norm(a.auditStatus) === 'approved');
        break;

      case 'LocationWise':
        this.auditData = [...this.rawData];
        setTimeout(() => {
          if (this.grid) {
            this.grid.groupColumn('location');
          }
        }, 100);
        break;

      default:
        this.auditData = [...this.rawData];
    }

    if (this.grid) {
      this.grid.dataSource = this.auditData;
      this.grid.refresh();
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
