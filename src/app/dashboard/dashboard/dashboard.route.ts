import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('src/app/ingreso/estadistica/estadistica.component')
    },
    {
        path: 'ingreso',
        loadComponent: () => import('src/app/ingreso/ingreso.component')
    },
    {
        path: 'detalle',
        loadComponent: () => import('src/app/ingreso/detalle/detalle.component')
    }
];
