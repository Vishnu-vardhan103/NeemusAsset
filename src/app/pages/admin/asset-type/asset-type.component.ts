import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asset-type',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asset-type.component.html',
  styleUrls: ['./asset-type.component.css']
})
export class AssetTypeComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
