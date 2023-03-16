import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCarreraPage } from './add-carrera.page';

const routes: Routes = [
  {
    path: '',
    component: AddCarreraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCarreraPageRoutingModule {}
