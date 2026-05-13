import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';


@Component({
  selector: 'app-view-audits',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTableComponent,],
  templateUrl: './view-audits.component.html',
  styles: []
})
export class ViewAuditsComponent implements OnInit {
  
  public auditColumns: TableColumn[] = [
    { field: 'auditName', headerText: 'Audit Name', width: 150 },
    { field: 'auditDescription', headerText: 'Audit Description', width: 200 },
    { field: 'createdBy', headerText: 'CreatedBy', width: 120 },
    { field: 'locationCode', headerText: 'Location Code', width: 130 },
    { field: 'location', headerText: 'Location', width: 180 },
    { field: 'auditDate', headerText: 'Audit Date', width: 130 },
    { field: 'auditStatus', headerText: 'Audit Status', width: 120 }
  ];
  
  public auditData: any[] = [
    { 
      auditName: 'test audit', 
      auditDescription: 'test added', 
      createdBy: 'z_sohel', 
      locationCode: 'NR72', 
      location: 'NITROGEN PLANT', 
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
