import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

export const roleGuard = (...allowedRoles: string[]): CanActivateFn => () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.user$.pipe(
    switchMap(user => {
      if (!user) {
        router.navigate(['/login']);
        return of(false);
      }
      return auth.getUserRole$().pipe(
        map(role => {
          if (role && allowedRoles.includes(role)) return true;
          router.navigate(['/unauthorized']);
          return false;
        }),
        catchError(() => {
          router.navigate(['/login']);
          return of(false);
        })
      );
    })
  );
};
