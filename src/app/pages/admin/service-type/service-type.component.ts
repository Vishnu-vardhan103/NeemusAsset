import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-type',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-type.component.html',
  styleUrls: ['./service-type.component.css']
})
export class ServiceTypeComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
