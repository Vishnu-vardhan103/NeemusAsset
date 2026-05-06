import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CommonCardComponent } from '../../../shared/components/common-card/common-card.component';

@Component({
  selector: 'app-add-location',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CommonCardComponent
  ],
  templateUrl: './add-location.component.html'
})
export class AddLocationComponent {
  constructor(private router: Router) {}

  locationData = {
    location: '',
    block: '',
    code: ''
  };

  saveLocation() {
    if (this.locationData.location && this.locationData.block && this.locationData.code) {
      console.log('Saving location:', this.locationData);
      alert('Location added successfully!');
      this.locationData = { location: '', block: '', code: '' };
      // Navigate to View Locations
      this.router.navigate(['/admin/view-locations']);
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
