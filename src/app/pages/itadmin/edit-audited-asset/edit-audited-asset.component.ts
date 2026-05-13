import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { CommonCardComponent } from '../../../shared/components/common-card/common-card.component';
import { ButtonComponent } from '../../../shared/components/button/button';

@Component({
  selector: 'app-edit-audited-asset',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTableComponent, CommonCardComponent, ButtonComponent],
  templateUrl: './edit-audited-asset.component.html',
  styleUrls: []
})
export class EditAuditedAssetComponent implements OnInit {
  selectedAuditPlan: string = '';
  selectedAssetClass: string = '';
  selectedAsset: string = '';
  selectedCustodian: string = '';
  assetLocation: string = '';
  remarks: string = '';
  assetStatus: string = '';
  
  public auditedAssetColumns: TableColumn[] = [
    { field: 'id', headerText: '#', width: 60 },
    { field: 'auditName', headerText: 'Audit Name', width: 130 },
    { field: 'auditBy', headerText: 'Audit By', width: 120 },
    { field: 'mainAssetNumber', headerText: 'Main Asset Number', width: 160 },
    { field: 'assetClass', headerText: 'Asset Class', width: 120 },
    { field: 'assetDesc', headerText: 'Asset Desc', width: 250 },
    { field: 'location', headerText: 'Location', width: 180 },
    { field: 'custodianId', headerText: 'Custodian ID', width: 120 },
    { field: 'auditStatus', headerText: 'Audit Status', width: 180 },
    { field: 'auditorComments', headerText: 'Auditor Comments', width: 160 },
    { field: 'auditedDate', headerText: 'Audited Date', width: 130 },
    { field: 'status', headerText: 'Status', width: 120 }
  ];

  auditedAssetData: any[] = [
    { id: 1, auditName: 'test audit', auditBy: 'z_sohel', mainAssetNumber: '60050039', assetClass: '6005', assetDesc: 'Printer, Copier cum Scanner cum Fax', location: 'CIVIL DEPARTMENT', custodianId: '25482', auditStatus: 'Asset Available', auditorComments: '', auditedDate: '16-Oct-2024', status: 'Approved' },
    { id: 2, auditName: 'test audit', auditBy: 'z_sohel', mainAssetNumber: '60050040', assetClass: '6005', assetDesc: 'Printer, Copier cum Scanner cum Fax', location: 'CISF', custodianId: '100528', auditStatus: 'Asset Location Transferred', auditorComments: 'wewd', auditedDate: '16-Oct-2024', status: 'Audited' },
    { id: 3, auditName: 'test audit', auditBy: 'z_sohel', mainAssetNumber: '60050011', assetClass: '6005', assetDesc: 'A3 Size Multi Function Printing Device(HP M5025)', location: 'FIELD OFFICE', custodianId: '150316', auditStatus: 'Asset Available', auditorComments: 'add', auditedDate: '18-Nov-2024', status: 'Audited' },
    { id: 4, auditName: 'test audit', auditBy: 'z_sohel', mainAssetNumber: '60030075', assetClass: '6003', assetDesc: 'G.SHDSL router to connect to SAM1316-22', location: 'IT DEPARTMENT', custodianId: '25479', auditStatus: 'Asset Available', auditorComments: 'test', auditedDate: '25-Apr-2023', status: 'Approved' },
    { id: 5, auditName: 'test audit', auditBy: 'z_sohel', mainAssetNumber: '60030031', assetClass: '6003', assetDesc: 'Cisco Catalyst 48P 10/100 switch', location: 'IT DEPARTMENT', custodianId: '150320', auditStatus: 'Asset Damaged but Repairable', auditorComments: 'test comment', auditedDate: '25-Apr-2023', status: 'Rejected' }
  ];

  ngOnInit(): void {
  }

  onUpdate() {
    console.log('Updating audited asset...', this.selectedAuditPlan, this.selectedAssetClass);
  }
}
