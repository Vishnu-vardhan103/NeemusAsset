import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { CommonCardComponent } from '../../../shared/components/common-card/common-card.component';

@Component({
  selector: 'app-audit-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTableComponent, CommonCardComponent],
  templateUrl: './audit-list.component.html',
  styleUrls: []
})
export class AuditListComponent implements OnInit {
  @ViewChild('dataTable') public dataTable!: DataTableComponent;
  
  filterType: string = 'All';

  public auditColumns: TableColumn[] = [
    { field: 'auditName', headerText: 'Audit Name', width: 150 },
    { field: 'auditDescription', headerText: 'Audit Description', width: 200 },
    { field: 'createdBy', headerText: 'CreatedBy', width: 120 },
    { field: 'locationCode', headerText: 'Location Code', width: 130 },
    { field: 'location', headerText: 'Location', width: 180 },
    { field: 'auditDate', headerText: 'Audit Date', width: 130 },
    { field: 'auditStatus', headerText: 'Audit Status', width: 120 }
  ];

  public rawData: any[] = [
    { auditName: 'test audit', auditDescription: 'test added', createdBy: 'z_sohel', locationCode: 'NR72', location: 'NITROGEN PLANT', auditDate: '25-Apr-2023', auditStatus: 'Active' },
    { auditName: 'Q2 Asset Verification', auditDescription: 'Quarterly verification of all IT assets', createdBy: 'Admin User', locationCode: 'HO01', location: 'Head Office', auditDate: '15-Apr-2026', auditStatus: 'In Progress' },
    { auditName: 'Data Center Audit', auditDescription: 'Full audit of server room assets', createdBy: 'System Admin', locationCode: 'DC01', location: 'Data Center', auditDate: '20-Apr-2026', auditStatus: 'Pending' },
    { auditName: 'Annual Review', auditDescription: 'Annual IT asset review', createdBy: 'Jane Doe', locationCode: 'NR11', location: 'IT DEPARTMENT', auditDate: '01-Jan-2026', auditStatus: 'Completed' },
    { auditName: 'Software Audit', auditDescription: 'Verification of software licenses', createdBy: 'z_sohel', locationCode: 'NR72', location: 'NITROGEN PLANT', auditDate: '10-Feb-2026', auditStatus: 'Approved' }
  ];

  public auditData: any[] = [];

  ngOnInit(): void {
    this.auditData = [...this.rawData];
  }

  onFilterChange() {
    if (this.filterType === 'All') {
      this.auditData = [...this.rawData];
    } else if (this.filterType === 'Current') {
      this.auditData = this.rawData.filter(a => a.auditStatus === 'Active' || a.auditStatus === 'In Progress');
    } else if (this.filterType === 'Pending') {
      this.auditData = this.rawData.filter(a => a.auditStatus === 'Pending');
    } else if (this.filterType === 'Completed') {
      this.auditData = this.rawData.filter(a => a.auditStatus === 'Completed');
    } else if (this.filterType === 'Approved') {
      this.auditData = this.rawData.filter(a => a.auditStatus === 'Approved');
    } else if (this.filterType === 'LocationWise') {
      this.auditData = [...this.rawData];
      setTimeout(() => {
         this.dataTable.gridInstance.groupColumn('location');
      }, 100);
      return;
    }
    
    // Clear grouping if not LocationWise
    if (this.filterType !== 'LocationWise' && this.dataTable?.gridInstance && this.dataTable.gridInstance.groupSettings.columns?.length) {
      this.dataTable.gridInstance.clearGrouping();
    }
  }
}
