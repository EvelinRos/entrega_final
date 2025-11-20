import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login';
import { Inicio } from './pages/inicio/inicio';
import { RegistrarPage } from './pages/registrar/registrar';
import { OlvidarConPage } from './pages/olvidar-con/olvidar-con';
import { authGuard } from './guards/auth-guard';         

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginPage },
  { path: 'registrar', component: RegistrarPage },
  { path: 'olvidar-con', component: OlvidarConPage },

  //Rutas protegidas
  { path: 'inicio', component: Inicio, canActivate: [authGuard] },
  { path: 'usuarios', loadComponent: () => import('./pages/usuarios/usuarios').then(m => m.UsuariosPage), canActivate: [authGuard] },

  { path: '**', redirectTo: 'login' }
];