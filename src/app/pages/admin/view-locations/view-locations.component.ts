import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-view-locations',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  templateUrl: './view-locations.component.html'
})
export class ViewLocationsComponent implements OnInit {
  locations: any[] = [
    { location: 'Headquarters', code: 'HQ-01', block: 'Building A', edit: '✏️ Edit', delete: '🗑️ Delete' },
    { location: 'Branch Office', code: 'BR-02', block: 'Building B', edit: '✏️ Edit', delete: '🗑️ Delete' },
    { location: 'Warehouse', code: 'WH-03', block: 'Storage Block', edit: '✏️ Edit', delete: '🗑️ Delete' },
    { location: 'R&D Center', code: 'RD-04', block: 'Lab Wing', edit: '✏️ Edit', delete: '🗑️ Delete' }
  ];

  columns: TableColumn[] = [
    { field: 'edit', headerText: 'Edit', width: 100, textAlign: 'Center' },
    { field: 'delete', headerText: 'Delete', width: 100, textAlign: 'Center' },
    { field: 'location', headerText: 'Location', width: 200 },
    { field: 'code', headerText: 'Location Code', width: 150 },
    { field: 'block', headerText: 'Block', width: 200 }
  ];

  ngOnInit(): void {}
}
