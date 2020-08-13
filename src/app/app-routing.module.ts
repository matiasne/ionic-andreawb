import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './Services/authentication/auth-guard.service'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recuperar-contrasena',
    loadChildren: () => import('./recuperar-contrasena/recuperar-contrasena.module').then( m => m.RecuperarContrasenaPageModule)
  },
  {
    path: 'recortar-imagen',
    loadChildren: () => import('./recortar-imagen/recortar-imagen.module').then( m => m.RecortarImagenPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'cambiar-contrasena',
    loadChildren: () => import('./cambiar-contrasena/cambiar-contrasena.module').then( m => m.CambiarContrasenaPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'form-registro',
    loadChildren: () => import('./form-registro/form-registro.module').then( m => m.FormRegistroPageModule)
  },   {
    path: 'form-registro-cliente',
    loadChildren: () => import('./form-registro-cliente/form-registro-cliente.module').then( m => m.FormRegistroClientePageModule)
  },
  {
    path: 'form-registro-poliza',
    loadChildren: () => import('./form-registro-poliza/form-registro-poliza.module').then( m => m.FormRegistroPolizaPageModule)
  },  {
    path: 'table-clientes',
    loadChildren: () => import('./table-clientes/table-clientes.module').then( m => m.TableClientesPageModule)
  },
  {
    path: 'table-polizas',
    loadChildren: () => import('./table-polizas/table-polizas.module').then( m => m.TablePolizasPageModule)
  },
  {
    path: 'table-comisiones',
    loadChildren: () => import('./table-comisiones/table-comisiones.module').then( m => m.TableComisionesPageModule)
  },

 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
