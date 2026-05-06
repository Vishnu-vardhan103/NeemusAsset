import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  GridModule,
  GridComponent,
  FilterService,
  SortService,
  PageService,
  GroupService,
  SearchService,
  ToolbarService,
  ExcelExportService,
  PdfExportService,
  ResizeService,
  ColumnChooserService,
  SelectionService,
  EditService,
  ColumnMenuService,
  FreezeService,
} from '@syncfusion/ej2-angular-grids';

export interface TableColumn {
  field: string;
  headerText: string;
  width?: number | string;
  format?: string;
  textAlign?: 'Left' | 'Center' | 'Right';
  type?: string;
  isPrimaryKey?: boolean;
  allowFiltering?: boolean;
  allowSorting?: boolean;
  clipMode?: 'Clip' | 'Ellipsis' | 'EllipsisWithTooltip';
  template?: any;
  visible?: boolean;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, GridModule, MatButtonModule, MatIconModule, MatTooltipModule],
  providers: [
    FilterService,
    SortService,
    PageService,
    GroupService,
    SearchService,
    ToolbarService,
    ExcelExportService,
    PdfExportService,
    ResizeService,
    ColumnChooserService,
    SelectionService,
    EditService,
    ColumnMenuService,
    FreezeService,
  ],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit, OnChanges {
  /** The dataset to render */
  @Input() data: any[] = [];

  /** Column definitions */
  @Input() columns: TableColumn[] = [];

  /** Title shown in the table header bar */
  @Input() title: string = 'Data Table';

  /** Page size for pagination */
  @Input() pageSize: number = 10;

  /** Enable row selection checkbox */
  @Input() allowSelection: boolean = true;

  /** Enable grouping */
  @Input() allowGrouping: boolean = false;

  /** Height of the grid body */
  @Input() height: string | number = 400;

  @ViewChild('grid') grid!: GridComponent;

  /** Expose grid instance for external actions */
  get gridInstance(): GridComponent {
    return this.grid;
  }

  /** Programmatic Excel Export */
  exportToExcel(fileName: string = 'Export'): void {
    if (this.grid) {
      this.grid.excelExport({ fileName: `${fileName}.xlsx` });
    }
  }

  /** Programmatic PDF Export */
  exportToPdf(fileName: string = 'Export'): void {
    if (this.grid) {
      this.grid.pdfExport({ fileName: `${fileName}.pdf` });
    }
  }

  /* ── Internal grid config ─────────────────────────── */
  filterSettings = { type: 'Menu' as const };
  sortSettings   = { columns: [] as any[] };
  pageSettings: any;
  selectionSettings = { type: 'Multiple' as const, checkboxMode: 'ResetOnRowClick' as const };
  groupSettings: any;
  editSettings = { allowAdding: false, allowEditing: false, allowDeleting: false };

  toolbar: string[] = [
    'Search',
    'ExcelExport',
    'PdfExport',
    'CsvExport',
    'ColumnChooser',
    'Print',
  ];

  ngOnInit(): void {
    this.pageSettings = { pageSize: this.pageSize, pageSizes: [5, 10, 25, 50, 100] };
    this.groupSettings = { showGroupedColumn: true, showDropArea: this.allowGrouping };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageSize']) {
      this.pageSettings = { pageSize: this.pageSize, pageSizes: [5, 10, 25, 50, 100] };
    }
  }

  /* ── Toolbar click handler (export) ───────────────── */
  toolbarClick(args: any): void {
    if (!this.grid) return;
    
    const id = args.item.id;
    
    if (id.includes('excelexport')) {
      this.grid.excelExport({ fileName: `${this.title}.xlsx` });
    } else if (id.includes('pdfexport')) {
      this.grid.pdfExport({ fileName: `${this.title}.pdf` });
    } else if (id.includes('csvexport')) {
      this.grid.csvExport({ fileName: `${this.title}.csv` });
    }
  }

  /** Returns selected row data */
  getSelectedRows(): any[] {
    return this.grid ? this.grid.getSelectedRecords() : [];
  }
}
