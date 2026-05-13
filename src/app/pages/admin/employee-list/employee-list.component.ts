import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, DataTableComponent, MatIcon],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  
  public empColumns: TableColumn[] = [
    { field: 'userId', headerText: 'User ID', width: 120 },
    { field: 'username', headerText: 'Username', width: 200 },
    { field: 'email', headerText: 'Email', width: 250 },
    { field: 'edit', headerText: 'Edit', width: 80 },
    { field: 'delete', headerText: 'Delete', width: 80 }
  ];

  public data: any[] = [
    { userId: 'EMP001', username: 'Ashok Kumar Sharma', email: 'ashok.sharma@nrl.co.in' },
    { userId: 'EMP002', username: 'Gaurab Das', email: 'gaurab.das@nrl.co.in' },
    { userId: 'EMP003', username: 'Gauri Duarah', email: 'gauri.duarah@nrl.co.in' }
  ];

  ngOnInit(): void {}

  editEmployee(data: any) {
    alert('Edit Employee: ' + data.userId);
  }

  deleteEmployee(data: any) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.data = this.data.filter(item => item.userId !== data.userId);
    }
  }
}
