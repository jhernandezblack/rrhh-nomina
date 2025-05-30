import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DynamicFormField } from '../../../models/dynamic-form-field.model';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  selector: 'app-dynamic-form-modal',
  templateUrl: './dynamic-form-modal.component.html',
  styleUrls: ['./dynamic-form-modal.component.scss']
})
export class DynamicFormModalComponent implements OnInit {
  public activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);
  
  @Input() formFields: DynamicFormField[] = [];
  @Input() title: string = '';
  @Input() saveText: string = 'Save';
  @Input() cancelText: string = 'Cancel';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  
  form: FormGroup = this.fb.group({});

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    const group: Record<string, FormControl> = {};
    
    this.formFields.forEach(field => {
      const validators = [];
      if (field.required) validators.push(Validators.required);
      
      if (field.validation) {
        if (field.validation.min) validators.push(Validators.min(field.validation.min));
        if (field.validation.max) validators.push(Validators.max(field.validation.max));
        if (field.validation.minLength) validators.push(Validators.minLength(field.validation.minLength));
        if (field.validation.maxLength) validators.push(Validators.maxLength(field.validation.maxLength));
        if (field.validation.pattern) validators.push(Validators.pattern(field.validation.pattern));
      }
      
      group[field.name] = new FormControl(
        { value: field.value || '', disabled: field.disabled || false },
        validators
      );
    });
    
    this.form = this.fb.group(group);
  }

  onSave(): void {
    if (this.form.valid) {
      this.activeModal.close(this.form.value);
    } else {
      this.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.activeModal.dismiss('cancel');
  }

  onReset(): void {
    this.form.reset();
    this.createForm();
  }

  private markAllAsTouched(): void {
    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  getControl(name: string): FormControl {
    return this.form.get(name) as FormControl;
  }
}