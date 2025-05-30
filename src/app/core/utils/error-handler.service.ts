import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  showError(title: string = 'Error', text: string = 'Ocurrió un error inesperado') {
    Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonColor: '#d33'
    });
  }

  showSuccess(title: string = 'Éxito', text: string = '') {
    Swal.fire({
      icon: 'success',
      title,
      text,
      confirmButtonColor: '#3085d6'
    });
  }

  showInfo(title: string, text: string) {
    Swal.fire({
      icon: 'info',
      title,
      text,
      confirmButtonColor: '#3085d6'
    });
  }
}
