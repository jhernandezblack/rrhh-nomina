// app.routes.ts
import { provideRouter, Route } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ProfileComponent } from './features/profile/profile.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
// Pages after login
import { MainComponent } from './features/main/main.component';

// protect page after login
import { roleGuard } from '../app/core/auth/guards/role.guard';
import { redirectIfAuthenticatedGuard } from './core/auth/guards/redirect-if-auth.guard';


export const routes: Route[] = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [redirectIfAuthenticatedGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [redirectIfAuthenticatedGuard] },

  { path: 'dashboard', component: DashboardComponent },
  // other routes...
  { path: 'main', component: MainComponent, canActivate: [roleGuard('admin', 'user')] },
  { path: 'profile', component: ProfileComponent, canActivate: [roleGuard('admin', 'user')] },
];
