import { Injectable, inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class errorInterceptor implements HttpInterceptor {
  private router = inject(Router);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        
        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          errorMessage = error.message;
        }

        if (error.status === 401) {
          this.router.navigate(['/login']);
        }

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
          timer: 5000,
          showConfirmButton: true
        });

        return throwError(() => error);
      })
    );
  }
}