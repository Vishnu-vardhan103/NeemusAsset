import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar';
import { SidebarComponent } from '../sidebar/sidebar';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, SidebarComponent],
  template: `
    <div class="h-screen flex flex-col bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <!-- Navbar -->
      <app-navbar></app-navbar>

      <div class="flex-1 flex overflow-hidden relative">
        <!-- Sidebar -->
        <div 
          class="absolute inset-y-0 left-0 z-40 lg:relative lg:translate-x-0 transition-all duration-500 ease-in-out"
          [class.translate-x-0]="isSidebarOpen"
          [class.-translate-x-full]="!isSidebarOpen">
          <app-sidebar></app-sidebar>
        </div>

        <!-- Overlay for mobile -->
        <div 
          *ngIf="isSidebarOpen" 
          (click)="isSidebarOpen = false"
          class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden animate-in fade-in duration-300">
        </div>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 bg-slate-50">
          <div class="max-w-screen-2xl mx-auto">
            <router-outlet></router-outlet>
          </div>
        </main>
      </div>
    </div>
  `
})
export class MainLayoutComponent {
  isSidebarOpen = false;

  @HostListener('window:toggle-sidebar')
  onToggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth >= 1024) {
      this.isSidebarOpen = false; // lg:relative takes care of it
    }
  }
}
