export interface User {
  id: string | number;
  email: string;
  name?: string;
  roles?: string[];
  permissions?: string[];
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  lastLoginAt?: Date;
  profileImage?: string;
  metadata?: Record<string, any>;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegistrationData extends LoginCredentials {
  name: string;
  confirmPassword?: string;
}

// Utility functions
export function hasRole(user: User | null, role: string): boolean {
  return user?.roles?.includes(role) ?? false;
}

export function hasAnyRole(user: User | null, roles: string[]): boolean {
  return user?.roles?.some(r => roles.includes(r)) ?? false;
}

export function hasPermission(user: User | null, permission: string): boolean {
  return user?.permissions?.includes(permission) ?? false;
}

// Type guards
export function isUser(obj: any): obj is User {
  return obj && typeof obj === 'object' && 'id' in obj && 'email' in obj;
}