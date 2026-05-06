import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent, TableColumn } from '../../../shared/components/data-table/data-table.component';

@Component({
  selector: 'app-view-employees',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  templateUrl: './view-employees.component.html',
  styleUrls: ['./view-employees.component.css']
})
export class ViewEmployeesComponent implements OnInit {
  employees: any[] = [
    { id: '150320', name: 'Ashok Kumar Sharma', designation: 'Process Operator', reporting: '100444', email: 'ashok.sharma@nrl.co.in' },
    { id: '100415', name: 'Gaurab Das', designation: 'SM(HR)', reporting: '100136', email: 'gaurab.das@nrl.co.in' },
    { id: '150395', name: 'Gauri Duarah', designation: 'Technician', reporting: '100402', email: 'gauri.duarah@nrl.co.in' },
    { id: '150303', name: 'Bhupen Chetia', designation: 'Process Operator', reporting: '100322', email: 'bhupen.chetia@nrl.co.in' },
    { id: '100676', name: 'Ashok Kumar Boruah', designation: 'CM(PROJECT)', reporting: '100103', email: 'ashok.boruah@nrl.co.in' },
    { id: '100358', name: 'Krishna Kt Dutta', designation: 'CM(OPNS)', reporting: '100235', email: 'krishna.dutta@nrl.co.in' },
    { id: '150313', name: 'Dinesh Das', designation: 'Process Operator', reporting: '100502', email: 'dinesh.das@nrl.co.in' },
    { id: '150316', name: 'Devajit Dev Sarmah', designation: 'Process Operator', reporting: '100328', email: 'devajit.sarmah@nrl.co.in' },
    { id: '150317', name: 'Deepak Kumar Boro', designation: 'Process Operator', reporting: '100168', email: 'deepak.boro@nrl.co.in' },
    { id: '100528', name: 'Tonmoy Phukan', designation: 'MGR(F&S)', reporting: '100389', email: 'tonmoy.phukan@nrl.co.in' }
  ];

  columns: TableColumn[] = [
    { field: 'edit', headerText: 'Edit', width: 100, textAlign: 'Center' },
    { field: 'delete', headerText: 'Delete', width: 100, textAlign: 'Center' },
    { field: 'id', headerText: 'Employee ID', width: 120 },
    { field: 'name', headerText: 'Custodian Name', width: 200 },
    { field: 'designation', headerText: 'Designation', width: 180 },
    { field: 'reporting', headerText: 'Reporting Authority', width: 150 },
    { field: 'email', headerText: 'Email', width: 220 }
  ];

  ngOnInit(): void {}
}
