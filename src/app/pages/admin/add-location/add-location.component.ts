import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BASE_URL } from '../../../core/Constant/apiConstant';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
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

const URL = BASE_URL;
const headers = new HttpHeaders();

@Component({
  selector: 'app-add-location',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GridModule,
    ButtonModule
  ],
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
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.css']
})
export class AddLocationComponent implements OnInit {
  @ViewChild('grid') public grid!: GridComponent;
  public locationData: any[] = [];

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
    { type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
    { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
    { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
    { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }
  ];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.getLocations();
  }

  getLocations() {
    this.http.get<any[]>(URL + '/LocationDetails', { headers })
      .subscribe({
        next: (res) => {
          this.locationData = res;
        },
        error: (err) => {
          console.error('Error fetching locations:', err);
        }
      });
  }

  actionComplete(args: any): void {
    if (args.requestType === 'save') {
      if (args.action === 'add') {
        this.saveLocation(args.data);
      } else if (args.action === 'edit') {
        this.updateLocation(args.data);
      }
    } else if (args.requestType === 'delete') {
      this.deleteLocation(args.data[0]);
    }
  }

  saveLocation(data: any) {
    this.http.post(URL + '/InsertLocation', data, { headers })
      .subscribe({
        next: () => {
          alert('Inserted Successfully');
          this.getLocations();
        },
        error: (err) => {
          console.error('Insert Failed:', err);
          alert('Insert Failed');
        }
      });
  }

  updateLocation(data: any) {
    this.http.put(URL + '/UpdateLocation', data, { headers })
      .subscribe({
        next: () => {
          alert('Updated Successfully');
          this.getLocations();
        },
        error: (err) => {
          console.error('Update Failed:', err);
          alert('Update Failed');
        }
      });
  }

  deleteLocation(data: any) {
    this.http.delete(URL + '/DeleteLocation/' + data.LocationID, { headers })
      .subscribe({
        next: () => {
          alert('Deleted Successfully');
          this.getLocations();
        },
        error: (err) => {
          console.error('Delete Failed:', err);
          alert('Delete Failed');
        }
      });
  }

  addRecord() {
    if (this.grid) {
      this.grid.addRecord();
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
