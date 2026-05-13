
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';


@Component({
  selector: 'app-assets-by-audits',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTableComponent],
  templateUrl: './assets-by-audits.html',
  styles: []
})
export class AssetsByAuditsComponent implements OnInit {
  
  public auditColumns: TableColumn[] = [
    { field: 'auditName', headerText: 'Main Asset Number', width: 150 },
    { field: 'auditStatus', headerText: 'Sub Number', width: 120 },
    {field: 'auditDate', headerText: 'Asset Description', width: 200 },
    {field: 'main asset no', headerText: 'Asset Class', width: 150 },
    {field: 'status', headerText: 'Location', width: 150 },
    {field: 'location', headerText: 'Audit By', width: 150 },
    {field: 'location', headerText: 'Audit Date', width: 150 },
    {field: 'location', headerText: 'Audit Status', width: 150 },
    {field: 'location', headerText: 'Status', width: 150 },
  
    
  ];
  
  public auditData: any[] = [
    { 
      auditName: 'Select audit', 
     
     
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