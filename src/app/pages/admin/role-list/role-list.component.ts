import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  
  public roleColumns: TableColumn[] = [
    { field: 'roleId', headerText: 'Role ID', width: 120 },
    { field: 'roleName', headerText: 'Role Name', width: 150 },
    { field: 'custId', headerText: 'Cust ID', width: 120 },
    { field: 'createdDate', headerText: 'Created Date', width: 130 },
    { field: 'status', headerText: 'Status', width: 120 },
    { field: 'edit', headerText: 'Edit', width: 80 },
    { field: 'delete', headerText: 'Delete', width: 80 }
  ];

  public data: any[] = [
    { roleId: 'RL001', roleName: 'Super Admin', custId: 'EMP001', createdDate: '2026-04-24', status: 'Active' },
    { roleId: 'RL002', roleName: 'IT Admin', custId: 'EMP102', createdDate: '2026-04-23', status: 'Active' },
    { roleId: 'RL003', roleName: 'Auditor', custId: 'EMP305', createdDate: '2026-04-22', status: 'Inactive' }
  ];

  ngOnInit(): void {}

  editRole(data: any) {
    console.log('Editing role:', data);
    alert('Edit Role: ' + data.roleId);
  }

  deleteRole(data: any) {
    if (confirm('Are you sure you want to delete this role mapping?')) {
      this.data = this.data.filter(item => item.roleId !== data.roleId);
    }
  }
}
