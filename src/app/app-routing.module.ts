import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [


  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
 
  {
    path: 'loginscreen',
    loadChildren: () => import('./pages/loginscreen/loginscreen.module').then( m => m.LoginscreenPageModule)
  },
   

  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },

   {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },   
  {
    path: 'add-usuario',
    loadChildren: () => import('./pages/add-usuario/add-usuario.module').then( m => m.AddUsuarioPageModule)
  },
  {
    path: 'add-caballo',
    loadChildren: () => import('./pages/caballos/add-caballo/add-caballo.module').then( m => m.AddCaballoPageModule)
  },


];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
