import { Routes } from '@angular/router';
import { Equipos } from './components/equipos/equipos';
import { Home } from './components/home/home';
import { Resultados } from './components/resultados/resultados';
import { Clasificaciones } from './components/clasificaciones/clasificaciones';
import { Jugadores } from './components/jugadores/jugadores';
import { Arbitros } from './components/arbitros/arbitros';
import { Contacto } from './components/contacto/contacto';
import { Admin } from './components/admin/admin';
import { Competiciones } from './components/competiciones/competiciones';
import { Acceso } from './components/acceso/acceso';

import { ArbitroDashboard } from './components/arbitro-dashboard/arbitro-dashboard';
import { CapitanDashboard } from './components/capitan-dashboard/capitan-dashboard';
import { UsuarioDashboard } from './components/usuario-dashboard/usuario-dashboard';

import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'competiciones', component: Competiciones },
    { path: 'equipos', component: Equipos },
    { path: 'resultados', component: Resultados },
    { path: 'clasificaciones', component: Clasificaciones },
    { path: 'jugadores', component: Jugadores },
    { path: 'arbitros', component: Arbitros },
    { path: 'contacto', component: Contacto },
    { path: 'acceso', component: Acceso },
    { path: 'admin', component: Admin, canActivate: [authGuard, roleGuard], data: {roles: ['admin']} },
    { path: 'arbitro-dashboard', component: ArbitroDashboard, canActivate: [authGuard, roleGuard], data: {roles: ['arbitro']} },
    { path: 'capitan-dashboard', component: CapitanDashboard, canActivate: [authGuard, roleGuard], data: {roles: ['capitan']} },
    { path: 'usuario-dashboard', component: UsuarioDashboard, canActivate: [authGuard, roleGuard], data: {roles: ['normal','usuario']} },

    { path: '**', redirectTo: '' },
];
