import { Routes } from '@angular/router';
import { SiderbarComponent } from './shared/components/sidebar/sidebar.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { DashboardComponent } from './bussiness/dashboard/dashboard.component';
import { PerfilComponent } from './bussiness/perfil/perfil.component';
import { TablasComponent } from './bussiness/tablas/tablas.component';
import { UserListComponent } from './bussiness/user-list/user-list.component';
import LoginComponent from './bussiness/login/login.component';
import { ProductosComponent } from './productos/productos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige al login
  { path: 'login', component: LoginComponent }, // Ruta explícita para login
  {
    path: 'sidebar',
    component: SiderbarComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'usuarios', component: UserListComponent },
      { path: 'productos', component: ProductosComponent },
      { path: '', redirectTo: 'productos', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'login' } // Manejo de rutas no encontradas
];
