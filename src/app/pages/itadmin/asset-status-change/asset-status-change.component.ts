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
import { FormsModule } from '@angular/forms';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';

const URL = BASE_URL;
const headers = new HttpHeaders();

@Component({
  selector: 'app-asset-status-change',
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
  templateUrl: './asset-status-change.component.html',
  styleUrls: ['./asset-status-change.component.css']
})
export class AssetStatusChangeComponent implements OnInit {
  @ViewChild('grid') public grid!: GridComponent;

  public assets: any[] = [];
  public locationData: any[] = [];
  public activeLocationData: any[] = [];
  public locationFields: Object = { text: 'location', value: 'locationID' };
  public selectedGridLocation: any = null;
  public isAddMode = false;
  public statusOptions: any[] = [];
  public assetFields: Object = { text: 'mainAssetNumber', value: 'mainAssetNumber' };

  public editSettings: EditSettingsModel = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    mode: 'Dialog',
    showDeleteConfirmDialog: true
  };

  public pageSettings: PageSettingsModel = { pageSize: 10, pageSizes: true };
  public toolbar: string[] = ['Add', 'Search', 'ExcelExport', 'PdfExport', 'ColumnChooser'];
  public filterSettings: FilterSettingsModel = { type: 'Excel' };
  public groupSettings: any = { showGroupedColumn: true };

  public commands: CommandModel[] = [
    { type: 'Edit',   buttonOption: { iconCss: 'e-icons e-edit',        cssClass: 'e-flat' } },
    { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete',      cssClass: 'e-flat' } },
    { type: 'Save',   buttonOption: { iconCss: 'e-icons e-update',      cssClass: 'e-flat' } },
    { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }
  ];

  public namerules     = { required: true };
  public assetrules    = { required: true };
  public statusrules   = { required: true };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.GetLocations();
    this.GetAssets();
      this.GetStatus();
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────────

  getLocationName(locationId: any): string {
    if (locationId === null || locationId === undefined || locationId === '') return '';
    const loc = this.locationData.find(x => x.locationID === Number(locationId));
    return loc ? loc.location : locationId.toString();
  }

  getStatusClass(status: string): string {
    switch ((status || '').toLowerCase()) {
      case 'active':   return 'bg-emerald-100 text-emerald-700';
      case 'inactive': return 'bg-slate-100 text-slate-600';
      case 'scrapped': return 'bg-rose-100 text-rose-700';
      case 'sold':     return 'bg-sky-100 text-sky-700';
      case 'pending':  return 'bg-amber-100 text-amber-700';
      default:         return 'bg-slate-100 text-slate-600';
    }
  }

  onGridLocationChange(event: any): void {
    if (event?.itemData?.locationID !== undefined) {
      this.selectedGridLocation = event.itemData.locationID;
    } else if (event?.value !== undefined && event.value !== null) {
      this.selectedGridLocation = event.value;
    } else {
      this.selectedGridLocation = null;
    }
  }

  // ─── API Calls ────────────────────────────────────────────────────────────────

  GetLocations(): void {
    this.http.get<any[]>(URL + '/LocationDetails', { headers }).subscribe({
      next: (res) => {
        this.locationData = res || [];
        this.activeLocationData = (res || []).filter(item =>
          item?.status?.trim().toLowerCase() === 'active' &&
          item?.location?.trim() !== ''
        );
      },
      error: (err) => console.error('Error fetching locations:', err)
    });
  }

  GetStatus(): void {
  this.http.get<any[]>(URL + '/Status', { headers }).subscribe({
    next: (res) => {
      this.statusOptions = res || [];
    },
    error: (err) => {
      console.error('Error fetching status:', err);
      // Provide minimal placeholder so dropdown shows only headers
      this.statusOptions = [{ statusCode: '', statusName: '' }];
      alert('Failed to load status options. Showing only headers.');
    }
  });
}

  GetAssets(): void {
      this.http.get<any[]>(URL + '/AssetDetails', { headers }).subscribe({
        next: (res) => {
          this.assets = res || [];
          if (this.grid) this.grid.refresh();
        },
        error: (err) => {
          console.error('Error fetching assets:', err);
          // Provide placeholder row so grid shows headers only
          this.assets = [{
            mainAssetNumber: '',
            subNumber: '',
            assetDescription: '',
            assetClass: '',
            statusCode: ''
          }];
          alert('Failed to load assets. Showing only headers.');
        }
      });
  }

  private buildInsertPayload(data: any): any {
    return {
      assetID: 0,
      mainAssetNumber:  data.mainAssetNumber  || '',
      subNumber:        data.subNumber        || '0',
      assetDescription: data.assetDescription || '',
      assetClass:       data.assetClass       || '',
      locationID:       Number(data.locationID),
      statusCode:       data.statusCode       || 'Active',
      custodianDept:    data.custodianDept    || '',
      quantity:         data.quantity         || 0,
      acquisitionDate:  data.acquisitionDate  || null,
      unit:             data.unit             || ''
    };
  }

  saveAsset(data: any): void {
    const body = this.buildInsertPayload(data);
    this.http.post(URL + '/InsertAsset', body, { headers }).subscribe({
      next: () => { alert('Inserted Successfully'); this.GetAssets(); },
      error: () => alert('Insert Failed')
    });
  }

  updateAsset(data: any): void {
    this.http.put(URL + '/UpdateAsset', data, { headers, responseType: 'text' }).subscribe({
      next: () => { alert('Updated Successfully'); this.GetAssets(); },
      error: () => alert('Update Failed')
    });
  }

  deleteAsset(assetID: number): void {
    this.http.delete(URL + '/DeleteAsset/' + assetID, { headers, responseType: 'text' }).subscribe({
      next: () => { alert('Deleted Successfully'); this.GetAssets(); },
      error: () => alert('Delete Failed')
    });
  }

  // ─── Grid Events ──────────────────────────────────────────────────────────────

  actionBegin(args: any): void {
  if (args.requestType === 'add') {
    this.isAddMode = true;
    this.selectedGridLocation = null;
    if (args.rowData) {
      args.rowData.statusCode = 'Active';
      args.rowData.mainAssetNumber = '';
    }

  } else if (args.requestType === 'beginEdit') {
    this.isAddMode = false;
    if (args.rowData) {
      this.selectedGridLocation = args.rowData.locationID ?? null;
    }

  } else if (args.requestType === 'save') {
    if (args.data) {
      if (args.action === 'add') {
        // Find the full asset record by mainAssetNumber and merge data
        const matched = this.assets.find(a => a.mainAssetNumber === args.data.mainAssetNumber);
        if (!matched) {
          alert('Please select a valid asset.');
          args.cancel = true;
          return;
        }
        // Merge the full asset fields so the grid row is complete
        Object.assign(args.data, matched, { statusCode: args.data.statusCode });
      } else {
        const locationID = this.selectedGridLocation ?? args.data.locationID ?? null;
        if (!locationID) {
          alert('Location is required');
          args.cancel = true;
          return;
        }
        args.data.locationID = Number(locationID);
        this.selectedGridLocation = Number(locationID);
      }
    }

  } else if (args.requestType === 'cancel') {
    this.isAddMode = false;
  }
}

  actionComplete(args: any): void {
    if (args.requestType === 'save') {
      const locationID = this.selectedGridLocation ?? args.data.locationID ?? null;

      const payload: any = {
        assetID:          args.data.assetID || 0,
        mainAssetNumber:  args.data.mainAssetNumber,
        subNumber:        args.data.subNumber || '0',
        assetDescription: args.data.assetDescription || '',
        assetClass:       args.data.assetClass || '',
        locationID:       Number(locationID),
        statusCode:       args.data.statusCode || 'Active',
        custodianDept:    args.data.custodianDept || '',
        quantity:         args.data.quantity || 0,
        acquisitionDate:  args.data.acquisitionDate || null,
        unit:             args.data.unit || ''
      };

      if (args.action === 'add') {
        this.saveAsset(payload);
        this.isAddMode = false;
      } else if (args.action === 'edit') {
        this.updateAsset(payload);
      }

    } else if (args.requestType === 'delete') {
      const deleted  = Array.isArray(args.data) ? args.data[0] : args.data;
      const assetID  = deleted?.assetID ?? deleted?.AssetID ?? null;
      if (assetID) {
        this.deleteAsset(assetID);
      } else {
        alert('Asset ID not found');
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