import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCaballoPage } from './add-caballo.page';

const routes: Routes = [
  {
    path: '',
    component: AddCaballoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCaballoPageRoutingModule {}
