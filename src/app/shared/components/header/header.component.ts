import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common'; // ✅ agrega NgIf
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Observable, filter } from 'rxjs';
import { User } from '@angular/fire/auth';
//sidebar
import { SidebarService } from '../../../core/services/sidebar.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIf], // ✅ importa NgIf
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$!: Observable<User | null>;
  currentRoute = '';
  isPublicRoute = false;

  constructor(
    private auth: AuthService, 
    private router: Router,
    private sidebarService: SidebarService
  ) {
  }

  ngOnInit(): void {
    this.user$ = this.auth.user$;

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects;
        this.isPublicRoute = [
          '/',
          '/login',
          '/register',
          '/unauthorized'
        ].includes(this.currentRoute);
      });
  }

  logout(): void {
    this.auth.logout();
  }
}

