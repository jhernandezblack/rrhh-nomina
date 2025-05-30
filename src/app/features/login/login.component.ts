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
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private alert = inject(SweetAlertService);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
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
      this.alert.error('Formulario inválido', 'Por favor ingresa tus credenciales correctamente.');
      return;
    }

    const { email, password } = this.form.value;
    this.loading = true;

    try {
      await this.authService.login(email!, password!);
      this.alert.success('Bienvenido', 'Inicio de sesión exitoso.');
      this.router.navigate(['/main']);
    } catch (error: any) {
      const message = error?.message || 'Ocurrió un error inesperado al iniciar sesión.';
      this.alert.error('Error de autenticación', message);
    } finally {
      this.loading = false;
    }
  }
}
