import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [


  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
 
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
 
  {
    path: 'add-caballo',
    loadChildren: () => import('./pages/caballos/add-caballo/add-caballo.module').then( m => m.AddCaballoPageModule)
  },
  {
    path: 'add-carrera',
    loadChildren: () => import('./pages/carreras/add-carrera/add-carrera.module').then( m => m.AddCarreraPageModule)
  },
  {
    path: 'add-jinete',
    loadChildren: () => import('./pages/jinetes/add-jinete/add-jinete.module').then( m => m.AddJinetePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },  
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
