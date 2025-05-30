import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class SweetAlertService {
  success(title: string, text?: string) {
    Swal.fire({
      icon: 'success',
      title,
      text,
      confirmButtonColor: '#3085d6'
    });
  }

  error(title: string, text?: string) {
    Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonColor: '#d33'
    });
  }

  info(title: string, text?: string) {
    Swal.fire({
      icon: 'info',
      title,
      text,
      confirmButtonColor: '#3085d6'
    });
  }

  confirm(
    title: string,
    text: string,
    confirmButtonText = 'Sí',
    cancelButtonText = 'Cancelar'
  ): Promise<boolean> {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#aaa'
    }).then(result => result.isConfirmed);
  }

  /**
   * Mapea códigos de error de Firebase a mensajes más amigables
   */
  getFirebaseAuthErrorMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'El correo electrónico ya está registrado.';
      case 'auth/invalid-email':
        return 'El correo electrónico no es válido.';
      case 'auth/weak-password':
        return 'La contraseña es muy débil. Usa al menos 6 caracteres.';
      case 'auth/user-not-found':
        return 'No se encontró ningún usuario con ese correo.';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta. Intenta de nuevo.';
      case 'auth/missing-password':
        return 'Debes ingresar una contraseña.';
      case 'auth/too-many-requests':
        return 'Demasiados intentos. Intenta más tarde.';
      default:
        return 'Ocurrió un error inesperado. Intenta nuevamente.';
    }
  }
}
