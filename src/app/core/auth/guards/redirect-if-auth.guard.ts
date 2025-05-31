import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

export const redirectIfAuthenticatedGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getFirebaseAuthState().pipe(
    map(user => {
      if (user) {
        router.navigate(['/main']);
        return false;
      }
      return true;
    })
  );
};
