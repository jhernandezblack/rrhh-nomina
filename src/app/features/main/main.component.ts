import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/services/auth.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'] // <-- Note: should be plural (styleUrls)
})
export class MainComponent implements OnInit {
  requiredRole = 'user';
  userProfile$: Observable<any> = of(null);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userProfile$ = this.authService.getUserProfile$();
    this.onAuthorizedLoad(); // Optional: load more secure data
  }

  onAuthorizedLoad(): void {
    console.log('✅ Usuario autorizado: cargando datos seguros...');
  }
}
