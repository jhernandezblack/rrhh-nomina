import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { SweetAlertService } from '../../shared/services/sweet-alert.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private alert = inject(SweetAlertService);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  });

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.alert.error('Formulario inválido', 'Por favor completa todos los campos correctamente.');
      return;
    }

    const { email, password, confirmPassword } = this.form.value;

    if (password !== confirmPassword) {
      this.alert.error('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      await this.auth.register(email!, password!);
      this.alert.success('Registro exitoso', 'Tu cuenta ha sido creada correctamente.');
      this.router.navigate(['/login']);
    } catch (error: any) {
      const message = error?.message || 'Ocurrió un error inesperado al registrar.';
      this.alert.error('Error en el registro', message);
    }
  }
}
