import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-view-departments',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  templateUrl: './view-departments.component.html',
  styleUrls: ['./view-departments.component.css']
})
export class ViewDepartmentsComponent implements OnInit {
  departments: any[] = [
    { id: 1, name: 'Numaligarh Refinery Limited', code: 'NRL', head: 'John Doe', status: 'Active' },
    { id: 2, name: 'Human Resources', code: 'HR', head: 'Jane Smith', status: 'Active' },
    { id: 3, name: 'Finance', code: 'FIN', head: 'Robert Brown', status: 'Active' },
    { id: 4, name: 'Information Technology', code: 'IT', head: 'Michael Wilson', status: 'Active' },
    { id: 5, name: 'Vigilence', code: 'VIG', head: 'Sarah Parker', status: 'Active' },
    { id: 6, name: 'Corporate Affairs', code: 'CORP', head: 'David Miller', status: 'Active' },
    { id: 7, name: 'Company Secretary', code: 'CS', head: 'Emily Davis', status: 'Active' },
    { id: 8, name: 'Internal Audit', code: 'AUD', head: 'Chris Evans', status: 'Active' },
    { id: 9, name: 'Commercial', code: 'COMM', head: 'Laura Taylor', status: 'Active' },
    { id: 10, name: 'Legal', code: 'LEG', head: 'Mark Thompson', status: 'Active' },
    { id: 11, name: 'Operations', code: 'OPS', head: 'James Anderson', status: 'Active' },
    { id: 12, name: 'Maintenance', code: 'MAINT', head: 'Patricia Moore', status: 'Active' },
    { id: 13, name: 'Safety', code: 'SAFE', head: 'Richard Jackson', status: 'Active' },
    { id: 14, name: 'Environment', code: 'ENV', head: 'Linda White', status: 'Active' },
    { id: 15, name: 'Quality Control', code: 'QC', head: 'Thomas Harris', status: 'Active' }
  ];

  columns: TableColumn[] = [
    { field: 'edit', headerText: 'Edit', width: 100, textAlign: 'Center' },
    { field: 'delete', headerText: 'Delete', width: 100, textAlign: 'Center' },
    { field: 'name', headerText: 'Department Name', width: 250 },
    { field: 'code', headerText: 'Dept Code', width: 120 },
    { field: 'head', headerText: 'Dept Head', width: 150 },
    { field: 'status', headerText: 'Status', width: 100 }
  ];

  ngOnInit(): void {}
}
