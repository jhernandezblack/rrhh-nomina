import { TemplateRef, Type } from '@angular/core';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';

export interface ModalConfig<T = any> {
  // Either template or component must be provided
  template?: TemplateRef<any>;
  component?: Type<any>;
  
  // Modal options
  size?: ModalSize;
  centered?: boolean;
  backdrop?: boolean | 'static';
  keyboard?: boolean;
  scrollable?: boolean;
  
  // Data to pass to the modal component
  data?: T;
  
  // Callbacks
  onClose?: (result?: any) => void;
  onDismiss?: (reason?: any) => void;
  
  // Custom classes
  modalClass?: string;
  dialogClass?: string;
}

export interface DynamicFormModalConfig {
  title: string;
  fields: DynamicFormField[];
  saveText?: string;
  cancelText?: string;
  size?: ModalSize;
  onSave: (data: any) => void;
  onCancel?: () => void;
}

export interface DynamicFormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'date';
  value?: any;
  required?: boolean;
  options?: string[]; // For select fields
  placeholder?: string;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string | RegExp;
    customValidator?: (value: any) => boolean;
  };
}