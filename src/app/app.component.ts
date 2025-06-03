import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { AuthService } from './core/auth/services/auth.service';
import { SidebarService } from './core/services/sidebar.service';
import { Observable, map } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuthenticated$;
  isSidebarCollapsed = false;

  constructor(
    private auth: AuthService,
    private sidebarService: SidebarService
  ) {
    this.isAuthenticated$ = this.auth.user$.pipe(map(user => !!user));
    this.sidebarService.collapsed$.subscribe(state => {
      this.isSidebarCollapsed = state;
    });
  }
}
