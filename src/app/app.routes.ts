import { Routes } from '@angular/router';
import { SiderbarComponent } from './shared/components/sidebar/sidebar.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { DashboardComponent } from './bussiness/dashboard/dashboard.component';
import { PerfilComponent } from './bussiness/perfil/perfil.component';
import { TablasComponent } from './bussiness/tablas/tablas.component';
import { UserListComponent } from './bussiness/user-list/user-list.component';
import LoginComponent from './bussiness/login/login.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    
  {
    path: 'sidebar',
    component: SiderbarComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'usuarios', component: UserListComponent },
      { path: 'tablas', component: TablasComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'login' }, 
];