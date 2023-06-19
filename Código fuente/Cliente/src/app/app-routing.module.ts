import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ValidarTokenGuard} from "./guards/validar-token.guard";
import {AdminComponent} from "./protected/admin/admin.component";
import {HomeComponent} from "./components/home/home.component";
import {UserComponent} from "./protected/user/user.component";

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },

  {
    path: 'alquilar_pistas',
    loadChildren: () => import('./protected/protected.module').then( m => m.ProtectedModule),
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard]
  },

  {
    path: 'admin',
    component: AdminComponent,
    loadChildren: () => import('./protected/protected.module').then( m => m.ProtectedModule),
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard]
  },

  {
    path: 'inicio',
    component: HomeComponent
  },

  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'perfil',
    component: UserComponent,
    loadChildren: () => import('./protected/protected.module').then( m => m.ProtectedModule),
    canActivate: [ValidarTokenGuard],
    canLoad: [ValidarTokenGuard]
  },

  {
    path: '**',
    redirectTo: 'auth'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
