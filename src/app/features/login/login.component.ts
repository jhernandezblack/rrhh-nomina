import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { SweetAlertService } from '../../shared/services/sweet-alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private alert = inject(SweetAlertService);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  loading = false;

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.alert.error(
        'Formulario inválido',
        'Por favor ingresa tus credenciales correctamente.'
      );
      return;
    }

    const { email, password } = this.form.value;
    this.loading = true;

    try {
      await this.authService.login(email!, password!);
      const user = this.authService.getCurrentUser();
      if (user) {
        await user.reload(); // 🔄 update user info from Firebase
        if (!user.emailVerified) {
          this.alert.warning(
            'Correo no verificado',
            'Por favor verifica tu correo antes de continuar.'
          );
          return;
        }
      }
      this.alert.success('Bienvenido', 'Inicio de sesión exitoso.');
      this.router.navigate(['/main']);
    } catch (error: any) {
      let message = 'Ocurrió un error inesperado al iniciar sesión.';

      // Firebase Auth error codes
      switch (error.code) {
        case 'auth/user-not-found':
          message = 'El correo electrónico no está registrado.';
          break;
        case 'auth/wrong-password':
          message = 'La contraseña es incorrecta.';
          break;
        case 'auth/invalid-email':
          message = 'El correo electrónico no es válido.';
          break;
        case 'auth/user-disabled':
          message = 'Esta cuenta ha sido deshabilitada.';
          break;
      }

      this.alert.error('Error de autenticación', message);
    }
  }
}
