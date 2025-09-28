import { Routes } from '@angular/router';
import { InitGuard } from './guards/init.guard';
import { AuthGuard } from './guards/auth.guard';
import { MenuItem } from 'primeng/api';

export const NAVIGATION_ELEMENTS: MenuItem[] = [
  {
    label: 'NAVIGATION.STUDENTS.LABEL',
    icon: 'pi pi-users',
    routerLink: '/dashboard/records',
  },
];

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [InitGuard],
    data: {
      redirectTo: 'dashboard',
    },
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
    children: [
      {
        path: '',
        redirectTo: 'records',
        pathMatch: 'full',
      },
      {
        path: 'records',
        loadComponent: () =>
          import('./pages/dashboard/sub-pages/records/records.component').then(
            (m) => m.RecordsComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
