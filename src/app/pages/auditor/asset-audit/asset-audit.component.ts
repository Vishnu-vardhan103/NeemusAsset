import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonCardComponent } from '../../../shared/components/common-card/common-card.component';
import { ButtonComponent } from '../../../shared/components/button/button';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-asset-audit',
  standalone: true,
  imports: [CommonModule, FormsModule, CommonCardComponent, ButtonComponent, DataTableComponent],
  templateUrl: './asset-audit.component.html',
  styles: []
})
export class AssetAuditComponent implements OnInit {
  selectedLocation: string = '';
  selectedAudit: string = '';
  auditStarted: boolean = false;
  
  locations: string[] = ['NITROGEN PLANT', 'MAIN BUILDING', 'LAB 1'];
  audits: string[] = ['test audit', 'annual audit', 'compliance audit'];
  assetClasses: string[] = ['Equipment', 'Furniture', 'IT Assets'];
  assets: string[] = ['Asset A1', 'Asset B2'];
  custodians: string[] = ['John Doe', 'Jane Smith'];
  statuses: string[] = ['Found', 'Missing', 'Damaged'];

  selectedAssetClass: string = '';
  selectedAsset: string = '';
  assetLocation: string = '';
  selectedCustodian: string = '';
  assetStatus: string = '';
  comments: string = '';

  columns: TableColumn[] = [
    { field: 'srNo', headerText: 'SRNO', width: 80, textAlign: 'Center' },
    { field: 'assetId', headerText: 'Asset ID', width: 120 },
    { field: 'mainAssetNumber', headerText: 'Main Asset Number', width: 150 },
    { field: 'auditName', headerText: 'Audit Name', width: 150 },
    { field: 'comments', headerText: 'Comments', width: 200 },
    { field: 'location', headerText: 'Location', width: 120 },
    { field: 'custodianId', headerText: 'Custodian ID', width: 120 },
    { field: 'auditStatus', headerText: 'Audit Status', width: 120 },
    { field: 'edit', headerText: 'Edit', width: 80, textAlign: 'Center', allowFiltering: false, allowSorting: false },
    { field: 'delete', headerText: 'Delete', width: 80, textAlign: 'Center', allowFiltering: false, allowSorting: false }
  ];

  auditData: any[] = [];
  editingRecordId: number | null = null;

  constructor() { }

  ngOnInit(): void { }

  onStartAudit() {
    if (this.selectedLocation && this.selectedAudit) {
      this.auditStarted = true;
    }
  }

  onAddAsset() {
    if (this.editingRecordId !== null) {
      // Update existing record
      const index = this.auditData.findIndex(r => r.srNo === this.editingRecordId);
      if (index !== -1) {
        this.auditData[index] = {
          ...this.auditData[index],
          mainAssetNumber: this.selectedAsset,
          comments: this.comments,
          location: this.assetLocation,
          custodianId: this.selectedCustodian,
          auditStatus: this.assetStatus
        };
        this.auditData = [...this.auditData]; // Trigger change detection
      }
      this.editingRecordId = null;
    } else {
      // Add new record
      const newEntry = {
        srNo: this.auditData.length + 1,
        assetId: 'AID-' + Math.floor(Math.random() * 1000),
        mainAssetNumber: this.selectedAsset || '-',
        auditName: this.selectedAudit,
        comments: this.comments,
        location: this.assetLocation || '-',
        custodianId: this.selectedCustodian || '-',
        auditStatus: this.assetStatus || '-'
      };
      this.auditData = [...this.auditData, newEntry];
    }
    this.resetAssetForm();
  }

  onEditRecord(record: any) {
    this.editingRecordId = record.srNo;
    this.selectedAssetClass = ''; // Assuming we don't have this in grid, set to empty or find logic
    this.selectedAsset = record.mainAssetNumber !== '-' ? record.mainAssetNumber : '';
    this.assetLocation = record.location !== '-' ? record.location : '';
    this.selectedCustodian = record.custodianId !== '-' ? record.custodianId : '';
    this.assetStatus = record.auditStatus !== '-' ? record.auditStatus : '';
    this.comments = record.comments;
  }

  onDeleteRecord(record: any) {
    this.auditData = this.auditData.filter(r => r !== record);
    // Re-index
    this.auditData = this.auditData.map((r, i) => ({ ...r, srNo: i + 1 }));
  }

  onSubmitAudit() {
    console.log('Audit submitted');
  }

  private resetAssetForm() {
    this.selectedAssetClass = '';
    this.selectedAsset = '';
    this.assetLocation = '';
    this.selectedCustodian = '';
    this.assetStatus = '';
    this.comments = '';
  }
}
