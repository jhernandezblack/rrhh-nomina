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
    confirmPassword: ['', [Validators.required]],
    dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
    birthDate: ['', [Validators.required]],
    position: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^9\d{8}$/)]]
  });

  get dni() {
    return this.form.get('dni');
  }

  get birthDate() {
    return this.form.get('birthDate');
  }

  get position() {
    return this.form.get('position');
  }

  get phone() {
    return this.form.get('phone');
  }

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
    console.log('✅ Botón Registrarse fue presionado');
    if (this.form.invalid) {
      this.alert.error('Formulario inválido', 'Por favor completa todos los campos correctamente.');
      return;
    }

    const { email, password, confirmPassword, dni, birthDate, position, phone } = this.form.value;

    if (password !== confirmPassword) {
      this.alert.error('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      // Crear usuario
      const userCredential = await this.auth.register(email!, password!);
      const user = userCredential.user;

      // Enviar email de verificación
      if (user && !user.emailVerified) {
        await this.auth.sendEmailVerification(user);
      }

      // Guardar datos adicionales en Firestore
      await this.auth.saveUserProfile(user.uid, {
        email,
        dni,
        birthDate,
        position,
        phone,
        createdAt: new Date(),
        emailVerified: false,
        role: 'user'
      });

      // Mostrar mensaje
      this.alert.success(
        'Registro exitoso',
        'Tu cuenta ha sido creada. Por favor revisa tu correo y verifica tu cuenta antes de iniciar sesión.'
      );

      this.router.navigate(['/login']);
    } catch (error: any) {
      let message = 'Ocurrió un error inesperado al registrar.';

      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'El correo electrónico ya está registrado.';
          break;
        case 'auth/invalid-email':
          message = 'El formato del correo electrónico no es válido.';
          break;
        case 'auth/weak-password':
          message = 'La contraseña es demasiado débil. Usa al menos 6 caracteres.';
          break;
      }

      this.alert.error('Error en el registro', message);
    }
  }
}
