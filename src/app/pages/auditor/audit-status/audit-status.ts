import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';


@Component({
  selector: 'app-audit-status',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTableComponent],
  templateUrl: './audit-status.html',
  styles: []
})
export class AuditStatusComponent implements OnInit {
  
  public auditColumns: TableColumn[] = [
    { field: 'auditName', headerText: 'Audit Name', width: 150 },
  
    { field: 'auditStatus', headerText: 'Asset Id', width: 120 },
    {field: 'auditDate', headerText: 'Audit Description', width: 200 },
    {field: 'main asset no', headerText: 'main Asset Number', width: 150 },
    {field: 'status', headerText: 'Status', width: 150 },
    {field: 'location', headerText: 'Location', width: 150 },
  ];
  
  public auditData: any[] = [
    { 
      auditName: 'test audit', 
     
      auditDate: '25-Apr-2023', 
      auditStatus: 'Active' 
    },
    { 
      auditName: 'Asset Verification 2026', 
      auditDescription: 'Annual IT asset verification', 
      createdBy: 'admin_audit', 
      locationCode: 'HO01', 
      location: 'HEAD OFFICE', 
      auditDate: '10-May-2026', 
      auditStatus: 'In Progress' 
    }
  ];

  ngOnInit(): void {}
}
