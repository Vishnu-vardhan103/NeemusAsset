import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-document-master',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './document-master.component.html',
  styleUrls: ['./document-master.component.css']
})
export class DocumentMasterComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
