import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'
import { TabsGuard } from './guards/tabs.guard'

const routes: Routes = [ 
  {
    path: '',
    canActivate: [TabsGuard],
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
 
  {
    path: 'add-caballo',
    canActivate: [TabsGuard],
    loadChildren: () => import('./pages/caballos/add-caballo/add-caballo.module').then( m => m.AddCaballoPageModule)
  },
  {
    path: 'add-carrera',
    canActivate: [TabsGuard],
    loadChildren: () => import('./pages/carreras/add-carrera/add-carrera.module').then( m => m.AddCarreraPageModule)
  },
  {
    path: 'add-jinete',
    canActivate: [TabsGuard],
    loadChildren: () => import('./pages/jinetes/add-jinete/add-jinete.module').then( m => m.AddJinetePageModule)
  },
  {
    path: 'register',
    canActivate: [AuthGuard],
    loadChildren: () => import('./Auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    canActivate: [AuthGuard],
    loadChildren: () => import('./Auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: '',
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
