import { Directive, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router } from '@angular/router';
import { EMPTY, switchMap, take } from 'rxjs';

@Directive() // no @Component, esto es una clase base abstracta
export abstract class SecureComponentBase implements OnInit {
  protected authService = inject(AuthService);
  protected router = inject(Router);

  abstract requiredRole: string;
  abstract onAuthorizedLoad(): void;

  ngOnInit(): void {
    this.authService.user$.pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          this.router.navigate(['/login']);
          return EMPTY;
        }
        return this.authService.getUserRole$(); // devuelve Observable<string|null>
      }),
      switchMap(role => {
        if (role !== this.requiredRole) {
          this.router.navigate(['/unauthorized']);
          return EMPTY;
        }
        // ✅ acceso válido, ejecuta lógica protegida
        return this.runAuthorizedLogic();
      })
    ).subscribe();
  }

  // Método interno que envuelve la lógica del hijo
  private runAuthorizedLogic() {
    this.onAuthorizedLoad(); // método definido en el hijo
    return EMPTY;
  }
}
