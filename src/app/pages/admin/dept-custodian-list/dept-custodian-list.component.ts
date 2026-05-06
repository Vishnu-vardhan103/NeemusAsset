import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-dept-custodian-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    DataTableComponent
  ],
  templateUrl: './dept-custodian-list.component.html',
  styleUrls: ['./dept-custodian-list.component.css']
})
export class DeptCustodianListComponent implements OnInit {
  selectedDept: string = '';
  
  departments = [
    { value: 'HR', viewValue: 'Human Resources' },
    { value: 'FIN', viewValue: 'Finance' },
    { value: 'IT', viewValue: 'Information Technology' },
    { value: 'OPS', viewValue: 'Operations' }
  ];

  allCustodians = [
    { id: '150320', name: 'Ashok Kumar Sharma', dept: 'Operations', designation: 'Process Operator' },
    { id: '100415', name: 'Gaurab Das', dept: 'Human Resources', designation: 'SM(HR)' },
    { id: '150395', name: 'Gauri Duarah', dept: 'Information Technology', designation: 'Technician' },
    { id: '150303', name: 'Bhupen Chetia', dept: 'Operations', designation: 'Process Operator' },
    { id: '100676', name: 'Ashok Kumar Boruah', dept: 'Projects', designation: 'CM(PROJECT)' },
    { id: '100358', name: 'Krishna Kt Dutta', dept: 'Operations', designation: 'CM(OPNS)' }
  ];

  filteredData: any[] = [];

  columns: TableColumn[] = [
    { field: 'edit', headerText: 'Edit', width: 100, textAlign: 'Center' },
    { field: 'delete', headerText: 'Delete', width: 100, textAlign: 'Center' },
    { field: 'id', headerText: 'Custodian ID', width: 150 },
    { field: 'name', headerText: 'Custodian Name', width: 250 },
    { field: 'dept', headerText: 'Department Name', width: 200 },
    { field: 'designation', headerText: 'Designation', width: 200 }
  ];

  ngOnInit(): void {
    this.filteredData = this.allCustodians;
  }

  onSearch() {
    if (this.selectedDept) {
      const deptObj = this.departments.find(d => d.value === this.selectedDept);
      const deptName = deptObj ? deptObj.viewValue : '';
      this.filteredData = this.allCustodians.filter(c => c.dept === deptName);
    } else {
      this.filteredData = this.allCustodians;
    }
  }
}
