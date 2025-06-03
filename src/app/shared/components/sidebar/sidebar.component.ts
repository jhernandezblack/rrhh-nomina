import { Component } from '@angular/core';
import { SidebarService } from '../../../core/services/sidebar.service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CommonModule } from '@angular/common'; // ✅ this is required
import { RouterModule } from '@angular/router';
import { map } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class SidebarComponent {
  isCollapsed = false;
  showConfigMenu = false;

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService
  ) {
    this.sidebarService.collapsed$.subscribe((state) => {
      this.isCollapsed = state;

      // Auto-close submenu when sidebar is collapsed
      if (this.isCollapsed) {
        this.showConfigMenu = false;
      }
    });
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  toggleConfigMenu() {
    this.showConfigMenu = !this.showConfigMenu;
  }
}
