import { Routes } from '@angular/router';
import DashboardComponent from './dashboard/dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard/dashboard.route';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login.component')
    },
    {
        path: 'register',
        loadComponent: () => import('./auth/register/register.component')
    },
    {
        path: '',
        component: DashboardComponent,
        children: dashboardRoutes
    },
    { path: '**', redirectTo: '' }
];
