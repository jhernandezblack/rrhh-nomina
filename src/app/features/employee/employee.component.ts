import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class EmployeeComponent {
  employeeForm: FormGroup;
  ngOnInit() {
    console.log('✅ CrearEmpleadoComponent loaded');
  }

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required, Validators.minLength(8)]],
      cargo: ['', Validators.required],
      fechaIngreso: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log('✅ Datos del empleado:', this.employeeForm.value);
      // Lógica para guardar en Firestore o API aquí
    }
  }
}
