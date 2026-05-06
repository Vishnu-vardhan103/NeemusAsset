import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { AssetService, Asset } from '../../../core/services/asset.service';

@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink, DataTableComponent],
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css'],
})
export class AssetListComponent implements OnInit {
  private assetService = inject(AssetService);

  @ViewChild(DataTableComponent) table!: DataTableComponent;

  /* ── Column definitions ───────────────────────────── */
  columns: TableColumn[] = [
    { field: 'edit', headerText: 'Edit', width: 100, textAlign: 'Center' },
    { field: 'delete', headerText: 'Delete', width: 100, textAlign: 'Center' },
    { field: 'mainAssetNumber',  headerText: 'Asset Number',   width: 160, isPrimaryKey: true, clipMode: 'EllipsisWithTooltip' },
    { field: 'subNumber',        headerText: 'Sub No.',         width: 90,  textAlign: 'Center' },
    { field: 'assetDescription', headerText: 'Description',     width: 230, clipMode: 'EllipsisWithTooltip' },
    { field: 'custodianDept',    headerText: 'Department',      width: 130 },
    { field: 'quantity',         headerText: 'Qty',             width: 75,  textAlign: 'Center', type: 'number' },
    { field: 'unit',             headerText: 'Unit',            width: 85,  textAlign: 'Center' },
    { field: 'acquisitionDate',  headerText: 'Acquisition',     width: 140 },
    { field: 'custodianId',      headerText: 'Custodian ID',    width: 130 },
    { field: 'location',         headerText: 'Location',        width: 160, clipMode: 'EllipsisWithTooltip' },
    { field: 'assetClass',       headerText: 'Asset Class',     width: 130 },
    { field: 'statusCode',       headerText: 'Status',          width: 110, textAlign: 'Center' },
    { field: 'component',        headerText: 'Component',       width: 120 },
  ];

  /* ── Reactive asset data from service ─────────────── */
  data: Asset[] = [];

  ngOnInit(): void {
    this.assetService.assets$.subscribe(assets => {
      this.data = [...assets];
    });
  }

  /* ── Computed stats ───────────────────────────────── */
  get activeCount()   { return this.data.filter(d => d.statusCode === 'Active').length; }
  get inactiveCount() { return this.data.filter(d => d.statusCode === 'Inactive').length; }
  get scrappedCount() { return this.data.filter(d => d.statusCode === 'Scrapped' || d.statusCode === 'Sold').length; }
  get totalAssets()   { return this.data.length; }
  get totalValue()    { return this.data.reduce((sum, d) => sum + (Number(d.currentValue) || 0), 0); }
}
