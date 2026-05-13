import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule,],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);
  private authService = inject(AuthService);

  userId = '';
  password = '';
  showPassword = false;
  selectedRole = 'Requester';
  roles = ['Requester', 'Approver', 'Auditor', 'IT-Admin', 'Admin', 'HR Admin'];
  isLoading = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    if (!this.selectedRole) return;

    this.isLoading = true;

    // Simulate loading for the animation
    setTimeout(() => {
      console.log('Login successful for role:', this.selectedRole);
      
      // Set the role in AuthService to update the sidebar
      this.authService.setRole(this.selectedRole);

      // All roles navigate to the unified dashboard layout
      this.router.navigate(['/dashboard']);
      this.isLoading = false;
    }, 2500);
  }

  onDownload() {
    console.log('Download triggered');
  }
}
