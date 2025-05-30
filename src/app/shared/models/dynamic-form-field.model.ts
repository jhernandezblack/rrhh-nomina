export interface DynamicFormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox' | 'date' | 'radio';
  value?: any;
  required?: boolean;
  disabled?: boolean;
  options?: { value: any, label: string }[]; // For select/radio fields
  placeholder?: string;
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string | RegExp;
    customValidator?: (value: any) => boolean;
  };
  cssClass?: string;
  hint?: string;
}